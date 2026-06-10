import os
os.environ['U2NET_HOME'] = '/app/models'

from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import Response, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from rembg import remove, new_session
import io
import gc
import asyncio
from PIL import Image, ImageDraw, ImageFont
from pillow_heif import register_heif_opener
import cv2
import numpy as np

# Register HEIC plugin
register_heif_opener()

# AVIF desteği (opsiyonel - eski pillow_heif sürümlerinde bulunmayabilir)
try:
    from pillow_heif import register_avif_opener
    register_avif_opener()
    print("AVIF support enabled via pillow_heif")
except ImportError:
    print("AVIF support not available (pillow_heif version too old)")

# --- RAM Optimization ---
# Use birefnet-general as default (SOTA quality, trained on massive datasets)
# birefnet-portrait available for human photo optimization
# Cache only the active model, auto-unload after idle timeout
_sessions = {}
_last_used = {}  # Track last usage time per model
MODEL_IDLE_TIMEOUT = 300  # 5 minutes in seconds

# Max image dimension to prevent OOM on huge files
MAX_IMAGE_DIMENSION = 4096

# Lock to ensure only ONE image is processed by the AI at a time.
inference_lock = None

def get_session(model_name: str = "birefnet-general"):
    """Lazy-load the rembg session and cache only the active model to prevent OOM."""
    global _sessions, _last_used
    if model_name not in _sessions:
        # Clear other models from memory first to prevent OOM
        if _sessions:
            print(f"Clearing model cache to free RAM before loading '{model_name}'...", flush=True)
            _sessions.clear()
            _last_used.clear()
            gc.collect()
        print(f"Loading rembg model '{model_name}' for the first time...", flush=True)
        _sessions[model_name] = new_session(model_name)
        print(f"Model '{model_name}' loaded successfully.", flush=True)
    # Update last usage timestamp
    import time
    _last_used[model_name] = time.time()
    return _sessions[model_name]

def unload_idle_models():
    """Unload models that haven't been used for MODEL_IDLE_TIMEOUT seconds."""
    global _sessions, _last_used
    import time
    now = time.time()
    models_to_unload = [
        name for name, last_used in _last_used.items()
        if now - last_used > MODEL_IDLE_TIMEOUT
    ]
    for name in models_to_unload:
        print(f"Auto-unloading idle model '{name}' (unused for {MODEL_IDLE_TIMEOUT}s)...", flush=True)
        del _sessions[name]
        del _last_used[name]
    if models_to_unload:
        gc.collect()
        print(f"Freed RAM from {len(models_to_unload)} idle model(s).", flush=True)

def limit_image_size(image: Image.Image, max_dim: int = MAX_IMAGE_DIMENSION) -> Image.Image:
    """Downscale image if any dimension exceeds max_dim to prevent OOM."""
    if max(image.width, image.height) > max_dim:
        ratio = min(max_dim / image.width, max_dim / image.height)
        new_size = (int(image.width * ratio), int(image.height * ratio))
        image = image.resize(new_size, Image.Resampling.LANCZOS)
        print(f"Limited image size to {new_size}")
    return image

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    global inference_lock
    inference_lock = asyncio.Lock()
    # Start background task to auto-unload idle models
    asyncio.create_task(_model_cleanup_loop())
    print("FastAPI startup: inference_lock initialized, model cleanup task started.", flush=True)

async def _model_cleanup_loop():
    """Background loop that checks for idle models every 60 seconds."""
    while True:
        await asyncio.sleep(60)
        try:
            unload_idle_models()
        except Exception as e:
            print(f"Model cleanup error: {e}", flush=True)

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/remove-background")
async def remove_background(
    file: UploadFile = File(...), 
    quality_tier: str = Form("free"),
    ai_model: str = Form("birefnet-general")
):
    try:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))

        # Safety: limit max size to prevent OOM
        image = limit_image_size(image)

        # Resolution limiting for free tier
        if quality_tier == "free":
            max_size = 2048
            if max(image.width, image.height) > max_size:
                ratio = min(max_size / image.width, max_size / image.height)
                new_size = (int(image.width * ratio), int(image.height * ratio))
                image = image.resize(new_size, Image.Resampling.LANCZOS)
                print(f"Resized image for Free tier to {new_size}")

        # Re-encode for rembg input
        buf = io.BytesIO()
        image.save(buf, format="PNG")
        image_data = buf.getvalue()
        buf.close()
        del buf

        # Process with lazy-loaded session (Thread-safe locked inference)
        async with inference_lock:
            session = get_session(ai_model)
            # Alpha matting produces cleaner edges (removes gray spots at fine details)
            # Only enable for portrait mode which benefits most from it
            use_alpha_matting = ai_model in ("birefnet-portrait", "birefnet-dis")
            
            if use_alpha_matting:
                try:
                    # Tighter thresholds for logos to preserve sharp geometry
                    fg_thresh = 245 if ai_model == "birefnet-dis" else 240
                    bg_thresh = 10 if ai_model == "birefnet-dis" else 20
                    erode_sz = 5 if ai_model == "birefnet-dis" else 10

                    output_data = await asyncio.to_thread(
                        remove, image_data, session=session,
                        alpha_matting=True,
                        alpha_matting_foreground_threshold=fg_thresh,
                        alpha_matting_background_threshold=bg_thresh,
                        alpha_matting_erode_size=erode_sz
                    )
                except Exception as mat_err:
                    print(f"Alpha matting failed, falling back to standard: {mat_err}")
                    output_data = await asyncio.to_thread(remove, image_data, session=session)
            else:
                output_data = await asyncio.to_thread(remove, image_data, session=session)
        
        # Free intermediary memory
        del image_data, image
        gc.collect()

        return Response(content=output_data, media_type="image/png")
    except Exception as e:
        gc.collect()
        print(f"Error remove_background: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/remove-watermark")
async def remove_watermark(
    file: UploadFile = File(...),
    mask: UploadFile = File(...)
):
    try:
        # Read the original image
        image_bytes = await file.read()
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image file")

        # Read the mask
        mask_bytes = await mask.read()
        mask_arr = np.frombuffer(mask_bytes, np.uint8)
        mask_img = cv2.imdecode(mask_arr, cv2.IMREAD_GRAYSCALE)
        
        if mask_img is None:
            raise HTTPException(status_code=400, detail="Invalid mask file")

        # Ensure mask is same size as image
        if mask_img.shape[:2] != img.shape[:2]:
            mask_img = cv2.resize(mask_img, (img.shape[1], img.shape[0]), interpolation=cv2.INTER_NEAREST)

        # Threshold mask to ensure it's binary (0 or 255)
        _, mask_img = cv2.threshold(mask_img, 127, 255, cv2.THRESH_BINARY)

        # Run OpenCV Telea Inpainting (fast and decent quality for watermarks)
        # Radius = 3
        result = cv2.inpaint(img, mask_img, 3, cv2.INPAINT_TELEA)

        # Encode to PNG
        success, encoded_image = cv2.imencode('.png', result)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to encode resulting image")

        return Response(content=encoded_image.tobytes(), media_type="image/png")
    
    except Exception as e:
        print(f"Error remove_watermark: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/convert-heic")
async def convert_heic(
    file: UploadFile = File(...), 
    format: str = Form("jpg"),
    width: int = Form(None),
    height: int = Form(None)
):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        del contents
        image = limit_image_size(image)

        # Apply resizing if provided
        if width and height:
            image = image.resize((width, height), Image.Resampling.LANCZOS)

        
        if format.lower() in ['jpg', 'jpeg']:
            image = image.convert('RGB')
            media_type = "image/jpeg"
            save_format = "JPEG"
        elif format.lower() == 'png':
            media_type = "image/png"
            save_format = "PNG"
        elif format.lower() == 'webp':
            media_type = "image/webp"
            save_format = "WEBP"
        elif format.lower() == 'heic':
            if image.mode not in ('RGB', 'RGBA'):
                image = image.convert('RGB')
            media_type = "image/heic"
            save_format = "HEIF"
        elif format.lower() == 'avif':
            if image.mode not in ('RGB', 'RGBA'):
                image = image.convert('RGB')
            media_type = "image/avif"
            save_format = "AVIF"
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported format: {format}")

        output_buffer = io.BytesIO()
        image.save(output_buffer, format=save_format, quality=90)
        output_buffer.seek(0)
        del image
        gc.collect()
        
        return StreamingResponse(output_buffer, media_type=media_type)
    except HTTPException:
        raise
    except Exception as e:
        gc.collect()
        print(f"Error convert_heic: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/convert-format")
async def convert_format(
    file: UploadFile = File(...), 
    format: str = Form("jpg"),
    width: int = Form(None),
    height: int = Form(None)
):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        del contents
        image = limit_image_size(image)

        # Apply resizing if provided
        if width and height:
            image = image.resize((width, height), Image.Resampling.LANCZOS)
        
        save_kwargs = {'quality': 90}  # Varsayılan kalite
        
        if format.lower() in ['jpg', 'jpeg']:
            if image.mode in ('RGBA', 'LA') or (image.mode == 'P' and 'transparency' in image.info):
                background = Image.new('RGB', image.size, (255, 255, 255))
                if image.mode == 'P':
                    image = image.convert('RGBA')
                background.paste(image, mask=image.split()[3])
                image = background
            else:
                image = image.convert('RGB')
                
            media_type = "image/jpeg"
            save_format = "JPEG"
            
        elif format.lower() == 'png':
            media_type = "image/png"
            save_format = "PNG"
            save_kwargs = {} # PNG doesn't use quality
        elif format.lower() == 'webp':
            media_type = "image/webp"
            save_format = "WEBP"
        elif format.lower() in ['ico', 'x-icon']:
            if image.mode not in ('RGB', 'RGBA'):
                image = image.convert('RGBA')
            media_type = "image/x-icon"
            save_format = "ICO"
            # Standard favicon sizes
            save_kwargs = {'sizes': [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]}
        elif format.lower() == 'heic':
            if image.mode not in ('RGB', 'RGBA'):
                image = image.convert('RGB')
            media_type = "image/heic"
            save_format = "HEIF"
        elif format.lower() == 'avif':
            if image.mode not in ('RGB', 'RGBA'):
                image = image.convert('RGB')
            media_type = "image/avif"
            save_format = "AVIF"
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported format: {format}")

        output_buffer = io.BytesIO()
        image.save(output_buffer, format=save_format, **save_kwargs)
        output_buffer.seek(0)
        del image
        gc.collect()
        
        return StreamingResponse(output_buffer, media_type=media_type)
    except HTTPException:
        raise
    except Exception as e:
        gc.collect()
        print(f"Error convert_format: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/compress")
async def compress_image(file: UploadFile = File(...), quality: int = Form(80)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        del contents
        image = limit_image_size(image)
        
        format_lower = file.filename.split('.')[-1].lower() if file.filename else 'jpg'
        if format_lower in ['jpg', 'jpeg']:
            save_format = 'JPEG'
            media_type = "image/jpeg"
            if image.mode != 'RGB':
                image = image.convert('RGB')
        elif format_lower == 'png':
            save_format = 'PNG'
            media_type = "image/png"
        elif format_lower == 'webp':
            save_format = 'WEBP'
            media_type = "image/webp"
        else:
            save_format = 'JPEG'
            media_type = "image/jpeg"
            image = image.convert('RGB')

        output_buffer = io.BytesIO()
        
        if save_format == 'PNG':
             image.save(output_buffer, format=save_format, optimize=True)
        else:
             image.save(output_buffer, format=save_format, quality=quality, optimize=True)
             
        output_buffer.seek(0)
        del image
        gc.collect()
        return StreamingResponse(output_buffer, media_type=media_type)
        
    except Exception as e:
        gc.collect()
        print(f"Error compress_image: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/watermark")
async def apply_watermark(file: UploadFile = File(...), text: str = Form(""), format: str = Form("jpg")):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        del contents
        image = limit_image_size(image)
        
        if image.mode != 'RGBA' and image.mode != 'RGB':
            image = image.convert('RGB')
            
        if text:
            # Create drawing context
            draw = ImageDraw.Draw(image)
            # Default to a simple font or load a TTF if available
            try:
                font = ImageFont.truetype("arial.ttf", 30)
            except IOError:
                font = ImageFont.load_default()
            
            draw.text((10, 50), text, fill="white", font=font)

        media_type = "image/jpeg"
        save_format = "JPEG"
        if format.lower() == 'png':
            media_type = "image/png"
            save_format = "PNG"
        elif format.lower() == 'webp':
            media_type = "image/webp"
            save_format = "WEBP"
        elif format.lower() == 'heic':
            media_type = "image/heic"
            save_format = "HEIF"
        elif format.lower() == 'avif':
            media_type = "image/avif"
            save_format = "AVIF"

        output_buffer = io.BytesIO()
        image.save(output_buffer, format=save_format, quality=90)
        output_buffer.seek(0)
        del image
        gc.collect()
        
        return StreamingResponse(output_buffer, media_type=media_type)
    except Exception as e:
        gc.collect()
        print(f"Error watermark: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/crop")
async def crop_image(
    file: UploadFile = File(...),
    x: int = Form(0),
    y: int = Form(0),
    width: int = Form(100),
    height: int = Form(100),
    format: str = Form("jpg")
):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        del contents
        
        # Calculate scaling if limit_image_size was previously applied locally, 
        # but here we just crop from the original server image
        # image = limit_image_size(image) # Note: cropping should ideally be before limits or scaled correctly
        
        # Crop: box is (left, upper, right, lower)
        box = (x, y, x + width, y + height)
        image = image.crop(box)
        
        if image.mode != 'RGBA' and image.mode != 'RGB':
            image = image.convert('RGB')

        media_type = "image/jpeg"
        save_format = "JPEG"
        if format.lower() == 'png':
            media_type = "image/png"
            save_format = "PNG"
        elif format.lower() == 'webp':
            media_type = "image/webp"
            save_format = "WEBP"
        elif format.lower() == 'heic':
            media_type = "image/heic"
            save_format = "HEIF"
        elif format.lower() == 'avif':
            media_type = "image/avif"
            save_format = "AVIF"

        output_buffer = io.BytesIO()
        image.save(output_buffer, format=save_format, quality=90)
        output_buffer.seek(0)
        del image
        gc.collect()
        
        return StreamingResponse(output_buffer, media_type=media_type)
    except Exception as e:
        gc.collect()
        print(f"Error crop: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"status": "VormPixyze Backend Running", "models_loaded": list(_sessions.keys())}

@app.get("/health")
def health_check():
    """Health check endpoint for monitoring."""
    import psutil, os, time
    process = psutil.Process(os.getpid())
    mem_mb = process.memory_info().rss / 1024 / 1024
    now = time.time()
    model_info = {}
    for name, last in _last_used.items():
        idle_secs = int(now - last)
        model_info[name] = {
            "idle_seconds": idle_secs,
            "unloads_in": max(0, MODEL_IDLE_TIMEOUT - idle_secs)
        }
    return {
        "status": "healthy",
        "models_loaded": list(_sessions.keys()),
        "model_idle_info": model_info,
        "memory_mb": round(mem_mb, 1),
        "auto_unload_timeout_s": MODEL_IDLE_TIMEOUT
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
