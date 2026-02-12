from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import Response, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from rembg import remove, new_session
import io
from PIL import Image
from pillow_heif import register_heif_opener
import numpy as np

# Register HEIC opener
register_heif_opener()



# Preload the High-Quality Model (Better for Logos/Hair)
model_name = "isnet-general-use"
session = new_session(model_name)

app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.post("/remove-background")
async def remove_background(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        # Use the specific session for better quality
        output_data = remove(image_data, session=session)
        return Response(content=output_data, media_type="image/png")
    except Exception as e:
        print(f"Error remove_background: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/convert-heic")
async def convert_heic(file: UploadFile = File(...), format: str = Form("jpg")):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Convert to RGB if saving as JPG
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
        else:
            raise HTTPException(status_code=400, detail="Unsupported format")

        output_buffer = io.BytesIO()
        image.save(output_buffer, format=save_format, quality=95)
        output_buffer.seek(0)
        
        return StreamingResponse(output_buffer, media_type=media_type)
    except Exception as e:
        print(f"Error convert_heic: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/convert-format")
async def convert_format(file: UploadFile = File(...), format: str = Form("jpg")):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        if format.lower() in ['jpg', 'jpeg']:
            # Handle transparency for PNG/WebP -> JPG
            if image.mode in ('RGBA', 'LA') or (image.mode == 'P' and 'transparency' in image.info):
                background = Image.new('RGB', image.size, (255, 255, 255))
                if image.mode == 'P':
                    image = image.convert('RGBA')
                background.paste(image, mask=image.split()[3]) # 3 is alpha channel
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
        else:
            raise HTTPException(status_code=400, detail="Unsupported format")

        output_buffer = io.BytesIO()
        image.save(output_buffer, format=save_format, quality=95)
        output_buffer.seek(0)
        
        return StreamingResponse(output_buffer, media_type=media_type)
    except Exception as e:
        print(f"Error convert_format: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/compress")
async def compress_image(file: UploadFile = File(...), quality: int = Form(80)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Determine format from original filename or content
        format_lower = file.filename.split('.')[-1].lower() if file.filename else 'jpg'
        if format_lower in ['jpg', 'jpeg']:
            save_format = 'JPEG'
            media_type = "image/jpeg"
            if image.mode != 'RGB':
                image = image.convert('RGB')
        elif format_lower == 'png':
            save_format = 'PNG'
            media_type = "image/png"
            # PNG compression in pillow is valid via compress_level (0-9), optimize=True
            # Mapping 1-100 quality to generic optimization
        elif format_lower == 'webp':
            save_format = 'WEBP'
            media_type = "image/webp"
        else:
            # Default to JPEG if unknown
            save_format = 'JPEG'
            media_type = "image/jpeg"
            image = image.convert('RGB')

        output_buffer = io.BytesIO()
        
        if save_format == 'PNG':
             # PNG uses compress_level, not quality. optimize=True helps.
             image.save(output_buffer, format=save_format, optimize=True)
        else:
             image.save(output_buffer, format=save_format, quality=quality, optimize=True)
             
        output_buffer.seek(0)
        return StreamingResponse(output_buffer, media_type=media_type)
        
    except Exception as e:
        print(f"Error compress_image: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"status": "VormPixyze Backend Running"}

if __name__ == "__main__":
    import uvicorn
    # 0.0.0.0 hosts on all interfaces (good for testing from other devices on network)
    uvicorn.run(app, host="0.0.0.0", port=8000)
