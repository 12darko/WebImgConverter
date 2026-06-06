FROM python:3.9-slim

WORKDIR /app

# Install system dependencies for rembg (cv2) and potential heif support
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download rembg models to avoid runtime download timeout (502 Bad Gateway)
ENV NUMBA_CACHE_DIR=/tmp/numba_cache
RUN python -c "from rembg import new_session; new_session('birefnet-general'); new_session('birefnet-portrait'); new_session('birefnet-dis')"

COPY . .

# Expose port 8000
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
