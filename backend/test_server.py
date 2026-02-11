import requests
import io
from PIL import Image

BASE_URL = "http://localhost:8000"

def create_dummy_image(format='PNG'):
    img = Image.new('RGB', (100, 100), color = 'red')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format=format)
    img_byte_arr.seek(0)
    return img_byte_arr

def test_endpoint(name, url, file_tuple, data=None):
    print(f"Testing {name}...")
    try:
        files = {'file': file_tuple}
        response = requests.post(url, files=files, data=data)
        if response.status_code == 200:
            print(f"✅ {name} Success! Output size: {len(response.content)} bytes")
            return True
        else:
            print(f"❌ {name} Failed: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ {name} Error: {e}")
        return False

def test_backend():
    print("Testing backend connection...")
    try:
        # 1. Root
        resp = requests.get(f"{BASE_URL}/")
        if resp.status_code == 200:
            print(f"✅ Root Endpoint: {resp.json()}")
        else:
            print("❌ Root Endpoint Failed")
            return

        # 2. Background Removal
        png_data = create_dummy_image('PNG')
        test_endpoint("Background Removal", f"{BASE_URL}/remove-background", ('test.png', png_data, 'image/png'))

        # 3. Format Conversion (PNG -> JPG)
        png_data = create_dummy_image('PNG')
        test_endpoint("Format Conversion (PNG->JPG)", f"{BASE_URL}/convert-format", 
                      ('test.png', png_data, 'image/png'), {'format': 'jpg'})

        # 4. Compression (JPG -> JPG)
        jpg_data = create_dummy_image('JPEG')
        test_endpoint("Compression", f"{BASE_URL}/compress", 
                      ('test.jpg', jpg_data, 'image/jpeg'), {'quality': 50})

        # 5. HEIC Conversion (Mocking with PNG just to check endpoint reachability, 
        # normally backend checks format but let's see if it accepts file)
        # Note: Backend relies on Pillow-Heif to open, so sending PNG might fail at open step. 
        # We will skip HEIC test if we don't have a real HEIC file, or expect a specific error.
        print("ℹ️ HEIC test skipped (requires real HEIC file).")

    except Exception as e:
        print("Global Test Error:", e)

if __name__ == "__main__":
    test_backend()
