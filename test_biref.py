import asyncio
import io
import time
from PIL import Image
from rembg import remove, new_session

async def test_models():
    input_path = r"C:\Users\ReinellS\.gemini\antigravity-ide\brain\70ce1319-fc9e-4e0b-9e43-20a6d62660ed\media__1780513316114.png"
    out_normal_path = r"C:\Users\ReinellS\.gemini\antigravity-ide\brain\70ce1319-fc9e-4e0b-9e43-20a6d62660ed\output_normal.png"
    out_thresh_path = r"C:\Users\ReinellS\.gemini\antigravity-ide\brain\70ce1319-fc9e-4e0b-9e43-20a6d62660ed\output_thresh.png"
    
    with open(input_path, "rb") as f:
        img_data = f.read()
    
    print("Loading birefnet-massive...")
    session = new_session("birefnet-massive")
    
    print("Processing...")
    t0 = time.time()
    out_data = await asyncio.to_thread(remove, img_data, session=session)
    print(f"Processed in {time.time() - t0:.2f}s")
    
    # 1. Normal output (Smooth Anti-Aliased Edges)
    with open(out_normal_path, "wb") as f:
        f.write(out_data)
        
    print(f"Saved massive output to {out_normal_path}")

if __name__ == "__main__":
    asyncio.run(test_models())
