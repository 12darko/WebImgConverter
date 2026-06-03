from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import Response, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from rembg import remove, new_session
import io
import gc
import asyncio
from PIL import Image, ImageDraw, ImageFont
from pillow_heif import register_heif_opener
import torch
import torchvision.transforms as transforms
from transformers import AutoModelForImageSegmentation

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
# Use birefnet-massive as default (SOTA quality, trained on massive datasets)
# birefnet-portrait available for human photo optimization
# Cache multiple models to allow user selection
_sessions = {}

# Max image dimension to prevent OOM on huge files
MAX_IMAGE_DIMENSION = 4096

# Lock to ensure only ONE image is processed by the AI at a time.
inference_lock = asyncio.Lock()

def get_session(model_name: str = "birefnet-massive"):
    """Lazy-load the rembg session and cache it."""
    global _sessions
    if model_name not in _sessions:
        print(f"Loading rembg model '{model_name}' for the first time...")
        _sessions[model_name] = new_session(model_name)
        print(f"Model '{model_name}' loaded successfully.")
    return _sessions[model_name]

# --- BRIA RMBG-2.0 Native PyTorch Implementation ---
_bria_model = None

def get_bria_model():
    """Lazy-load the native BRIA RMBG-2.0 model from Hugging Face."""
    global _bria_model
    if _bria_model is None:
        print("Loading native BRIA RMBG-2.0 from Hugging Face...")
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        _bria_model = AutoModelForImageSegmentation.from_pretrained("briaai/RMBG-2.0", trust_remote_code=True)
        _bria_model.to(device)
        _bria_model.eval()
        print("Native BRIA RMBG-2.0 loaded successfully.")
    return _bria_model

def process_bria_native(image: Image.Image) -> bytes:
    """Process an image using the native BRIA RMBG-2.0 PyTorch model."""
    model = get_bria_model()
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    orig_size = image.size
    img_rgb = image.convert("RGB")
    
    # Bria-2.0 expected tensor format: 1024x1024 Normalized RGB
    transform_image = transforms.Compose([
        transforms.Resize((1024, 1024)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    
    input_images = transform_image(img_rgb).unsqueeze(0).to(device)
    
    # Inference
    with torch.no_grad():
        preds = model(input_images)[-1].sigmoid().cpu()
    
    # Convert prediction to PIL mask and resize back to original dimensions
    pred = preds[0].squeeze()
    pred_pil = transforms.ToPILImage()(pred)
    mask = pred_pil.resize(orig_size, Image.Resampling.BILINEAR)
    
    # Apply mask to original image
    img_rgba = img_rgb.convert("RGBA")
    img_rgba.putalpha(mask)
    
    # Return as PNG bytes
    out_buf = io.BytesIO()
    img_rgba.save(out_buf, format="PNG")
    val = out_buf.getvalue()
    out_buf.close()
    return val

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
    quality_tier: str = Form("free"),
    ai_model: str = Form("birefnet-massive")
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
        async with inference_lock:
            if ai_model == "bria-rmbg":
                # Use our native PyTorch BRIA RMBG-2.0 implementation
                output_data = await asyncio.to_thread(process_bria_native, image)
            else:
                session = get_session(ai_model)
                # Alpha matting produces cleaner edges (removes gray spots at fine details)
                # Only enable for portrait mode which benefits most from it
                use_alpha_matting = ai_model == "birefnet-portrait"
                
                if use_alpha_matting:
                    try:
                        output_data = await asyncio.to_thread(
                            remove, image_data, session=session,
                            alpha_matting=True,
                            alpha_matting_foreground_threshold=240,
                            alpha_matting_background_threshold=20,
                            alpha_matting_erode_size=10
                        )
                    except Exception as mat_err:
                        print(f"Alpha matting failed, falling back to standard: {mat_err}")
                        output_data = await asyncio.to_thread(remove, image_data, session=session)
                else:
                    output_data = await asyncio.to_thread(remove, image_data, session=session)
        
        # --- ALPHA THRESHOLDING FOR LOGO/TEXT MODE ---
        if ai_model == "bria-rmbg":
            try:
                # Load the PNG output
                bg_removed_img = Image.open(io.BytesIO(output_data))
                if bg_removed_img.mode == "RGBA":
                    # Harden the alpha channel to fix semi-transparent text/logo edges
                    # Any pixel with >15% opacity (40/255) becomes fully opaque
                    r, g, b, a = bg_removed_img.split()
                    a = a.point(lambda p: 255 if p > 40 else 0)
                    bg_removed_img = Image.merge("RGBA", (r, g, b, a))
                    
                    # Convert back to bytes
                    out_buf = io.BytesIO()
                    bg_removed_img.save(out_buf, format="PNG")
                    output_data = out_buf.getvalue()
                    out_buf.close()
                del bg_removed_img
            except Exception as thresh_err:
                print(f"Alpha thresholding failed: {thresh_err}")
                pass

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
    return {"status": "VormPixyze Backend Running", "models_loaded": list(_sessions.keys())}

@app.get("/health")
def health_check():
    """Health check endpoint for monitoring."""
    import psutil, os
    process = psutil.Process(os.getpid())
    mem_mb = process.memory_info().rss / 1024 / 1024
    return {
        "status": "healthy",
        "models_loaded": list(_sessions.keys()),
        "memory_mb": round(mem_mb, 1)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
