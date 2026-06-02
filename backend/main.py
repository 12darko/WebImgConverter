from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import Response, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from rembg import remove, new_session
import io
import gc
import asyncio
from PIL import Image, ImageDraw, ImageFont
from pillow_heif import register_heif_opener

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
# Use isnet-general-use as it performs better on logos/icons without deleting too much
# to prevent parallel processing from spiking RAM to 15GB+.
MODEL_NAME = "isnet-general-use"
_session = None

# Max image dimension to prevent OOM on huge files
MAX_IMAGE_DIMENSION = 4096

# Lock to ensure only ONE image is processed by the AI at a time.
# Prevents 10 concurrent requests from using 10x RAM (15GB+).
inference_lock = asyncio.Lock()

def get_session():
    """Lazy-load the rembg session to save startup RAM."""
    global _session
    if _session is None:
        print(f"Loading rembg model '{MODEL_NAME}' on first request...")
        _session = new_session(MODEL_NAME)
        print(f"Model '{MODEL_NAME}' loaded successfully.")
    return _session

def limit_image_size(image: Image.Image, max_dim: int = MAX_IMAGE_DIMENSION) -> Image.Image:
    """Downscale image if any dimension exceeds max_dim to prevent OOM."""
    if max(image.width, image.height) > max_dim:
        ratio = min(max_dim / image.width, max_dim / image.height)
        new_size = (int(image.width * ratio), int(image.height * ratio))
        image = image.resize(new_size, Image.Resampling.LANCZOS)
        print(f"Limited image size to {new_size}")
    return image

app = FastAPI()

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
    quality_tier: str = Form("free")
):
    try:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))

        # Safety: limit max size to prevent OOM
        image = limit_image_size(image)

        # Resolution limiting for free tier
        if quality_tier == "free":
            max_size = 1080
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
        session = get_session()
        
        # Async lock and thread offloading prevents 15GB spikes from concurrent users
        # and stops the CPU-heavy AI from blocking other API requests.
        async with inference_lock:
            # We run the synchronous CPU-heavy remove function in a separate thread chunk
            output_data = await asyncio.to_thread(remove, image_data, session=session)
        
        # Free intermediary memory
        del image_data, image
        gc.collect()

        return Response(content=output_data, media_type="image/png")
    except Exception as e:
        gc.collect()
        print(f"Error remove_background: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/convert-heic")
async def convert_heic(file: UploadFile = File(...), format: str = Form("jpg")):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        del contents
        image = limit_image_size(image)
        
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
async def convert_format(file: UploadFile = File(...), format: str = Form("jpg")):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        del contents
        image = limit_image_size(image)
        
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
    return {"status": "VormPixyze Backend Running", "model": MODEL_NAME}

@app.get("/health")
def health_check():
    """Health check endpoint for monitoring."""
    import psutil, os
    process = psutil.Process(os.getpid())
    mem_mb = process.memory_info().rss / 1024 / 1024
    return {
        "status": "healthy",
        "model": MODEL_NAME,
        "model_loaded": _session is not None,
        "memory_mb": round(mem_mb, 1)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
