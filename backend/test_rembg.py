print("Importing rembg...")
try:
    from rembg import remove
    print("rembg imported successfully!")
except Exception as e:
    print(f"Failed to import rembg: {e}")
except ImportError as e:
    print(f"ImportError: {e}")
