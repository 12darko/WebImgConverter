import sys
import os
from PIL import Image
from rembg import remove, new_session

def test_model(model_name):
    print(f"Testing model: {model_name}")
    try:
        session = new_session(model_name)
        # Create a simple red 100x100 square with a blue circle in center
        img = Image.new("RGB", (200, 200), (255, 0, 0))
        from PIL import ImageDraw
        draw = ImageDraw.Draw(img)
        draw.ellipse([50, 50, 150, 150], fill=(0, 0, 255))
        
        # Save to buffer
        import io
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        img_data = buf.getvalue()
        
        # Process
        out_data = remove(img_data, session=session)
        
        # Open output
        out_img = Image.open(io.BytesIO(out_data))
        print(f"  Output format: {out_img.format}, mode: {out_img.mode}, size: {out_img.size}")
        
        # Check transparency
        if out_img.mode == "RGBA":
            extrema = out_img.getextrema()
            alpha_extrema = extrema[3]
            print(f"  Alpha channel min/max: {alpha_extrema}")
            if alpha_extrema[0] == 255:
                print("  WARNING: Output is fully opaque (no transparency)!")
            else:
                print("  SUCCESS: Output has transparency.")
        else:
            print("  WARNING: Output does not have an alpha channel!")
            
    except Exception as e:
        print(f"  Failed: {e}")

if __name__ == "__main__":
    models = ["birefnet-general", "birefnet-portrait", "birefnet-dis", "birefnet-massive"]
    for m in models:
        test_model(m)
        print("-" * 40)
