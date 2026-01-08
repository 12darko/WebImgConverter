/**
 * Image Format Encoders for BMP and TIFF
 * These functions convert canvas ImageData to binary file formats
 */

/**
 * Encodes canvas ImageData to BMP format
 * @param imageData - Canvas ImageData object
 * @returns Blob of BMP file
 */
export function encodeToBMP(imageData: ImageData): Blob {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;

    // BMP file structure
    const rowSize = Math.ceil((width * 3) / 4) * 4; // Row size padded to 4 bytes
    const pixelDataSize = rowSize * height;
    const fileSize = 54 + pixelDataSize; // Header (54 bytes) + pixel data

    const buffer = new ArrayBuffer(fileSize);
    const view = new DataView(buffer);

    // BMP Header (14 bytes)
    view.setUint8(0, 0x42); // 'B'
    view.setUint8(1, 0x4D); // 'M'
    view.setUint32(2, fileSize, true); // File size
    view.setUint16(6, 0, true); // Reserved
    view.setUint16(8, 0, true); // Reserved
    view.setUint32(10, 54, true); // Pixel data offset

    // DIB Header (40 bytes - BITMAPINFOHEADER)
    view.setUint32(14, 40, true); // DIB header size
    view.setInt32(18, width, true); // Width
    view.setInt32(22, -height, true); // Height (negative for top-down)
    view.setUint16(26, 1, true); // Color planes
    view.setUint16(28, 24, true); // Bits per pixel (24-bit RGB)
    view.setUint32(30, 0, true); // Compression (none)
    view.setUint32(34, pixelDataSize, true); // Image size
    view.setInt32(38, 2835, true); // Horizontal resolution (72 DPI)
    view.setInt32(42, 2835, true); // Vertical resolution (72 DPI)
    view.setUint32(46, 0, true); // Colors in palette
    view.setUint32(50, 0, true); // Important colors

    // Pixel data (BGR format, bottom-up is handled by negative height)
    let offset = 54;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            view.setUint8(offset++, data[i + 2]); // Blue
            view.setUint8(offset++, data[i + 1]); // Green
            view.setUint8(offset++, data[i]);     // Red
        }
        // Padding to 4-byte boundary
        const padding = rowSize - width * 3;
        for (let p = 0; p < padding; p++) {
            view.setUint8(offset++, 0);
        }
    }

    return new Blob([buffer], { type: 'image/bmp' });
}

/**
 * Encodes canvas ImageData to TIFF format (uncompressed)
 * @param imageData - Canvas ImageData object
 * @returns Blob of TIFF file
 */
export function encodeToTIFF(imageData: ImageData): Blob {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;

    // Strip data (RGB only, no alpha for simpler TIFF)
    const stripData = new Uint8Array(width * height * 3);
    for (let i = 0, j = 0; i < data.length; i += 4, j += 3) {
        stripData[j] = data[i];     // Red
        stripData[j + 1] = data[i + 1]; // Green
        stripData[j + 2] = data[i + 2]; // Blue
    }

    // TIFF structure
    const ifdOffset = 8; // Right after header
    const numTags = 10;
    const ifdSize = 2 + numTags * 12 + 4; // Entry count + tags + next IFD pointer
    const stripOffset = ifdOffset + ifdSize;
    const fileSize = stripOffset + stripData.length;

    const buffer = new ArrayBuffer(fileSize);
    const view = new DataView(buffer);
    const uint8 = new Uint8Array(buffer);

    // TIFF Header (8 bytes)
    view.setUint16(0, 0x4949, false); // Little endian 'II'
    view.setUint16(2, 42, true); // TIFF magic number
    view.setUint32(4, ifdOffset, true); // Offset to first IFD

    // IFD (Image File Directory)
    let offset = ifdOffset;
    view.setUint16(offset, numTags, true); offset += 2;

    // Helper to write IFD entry
    const writeTag = (tag: number, type: number, count: number, value: number) => {
        view.setUint16(offset, tag, true); offset += 2;
        view.setUint16(offset, type, true); offset += 2;
        view.setUint32(offset, count, true); offset += 4;
        view.setUint32(offset, value, true); offset += 4;
    };

    // Tags (sorted by tag number)
    writeTag(256, 3, 1, width);           // ImageWidth (SHORT)
    writeTag(257, 3, 1, height);          // ImageLength (SHORT)
    writeTag(258, 3, 1, 8);               // BitsPerSample (8 bits)
    writeTag(259, 3, 1, 1);               // Compression (none)
    writeTag(262, 3, 1, 2);               // PhotometricInterpretation (RGB)
    writeTag(273, 4, 1, stripOffset);     // StripOffsets (LONG)
    writeTag(277, 3, 1, 3);               // SamplesPerPixel (3 for RGB)
    writeTag(278, 3, 1, height);          // RowsPerStrip
    writeTag(279, 4, 1, stripData.length); // StripByteCounts
    writeTag(284, 3, 1, 1);               // PlanarConfiguration (chunky)

    // Next IFD offset (0 = no more IFDs)
    view.setUint32(offset, 0, true);

    // Write strip data
    uint8.set(stripData, stripOffset);

    return new Blob([buffer], { type: 'image/tiff' });
}

/**
 * Encodes canvas ImageData to ICO format (32x32 favicon)
 * @param imageData - Canvas ImageData object
 * @returns Blob of ICO file
 */
export function encodeToICO(imageData: ImageData): Blob {
    // ICO files typically use 32x32 or 16x16 images
    // We'll create a 32x32 version
    const targetSize = 32;

    // Create a temporary canvas to resize
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.putImageData(imageData, 0, 0);

    // Create scaled canvas
    const icoCanvas = document.createElement('canvas');
    icoCanvas.width = targetSize;
    icoCanvas.height = targetSize;
    const icoCtx = icoCanvas.getContext('2d')!;
    icoCtx.drawImage(tempCanvas, 0, 0, targetSize, targetSize);

    const scaledData = icoCtx.getImageData(0, 0, targetSize, targetSize);
    const data = scaledData.data;

    // ICO structure: Header (6 bytes) + Directory Entry (16 bytes) + BMP Data
    const bmpDataSize = 40 + (targetSize * targetSize * 4) + (targetSize * targetSize / 8);
    const headerSize = 6;
    const dirEntrySize = 16;
    const fileSize = headerSize + dirEntrySize + Math.ceil(bmpDataSize);

    const buffer = new ArrayBuffer(fileSize);
    const view = new DataView(buffer);
    const uint8 = new Uint8Array(buffer);

    // ICO Header (6 bytes)
    view.setUint16(0, 0, true);      // Reserved
    view.setUint16(2, 1, true);      // Type: 1 = ICO
    view.setUint16(4, 1, true);      // Number of images

    // Directory Entry (16 bytes)
    view.setUint8(6, targetSize);     // Width (0 = 256)
    view.setUint8(7, targetSize);     // Height
    view.setUint8(8, 0);              // Color palette
    view.setUint8(9, 0);              // Reserved
    view.setUint16(10, 1, true);      // Color planes
    view.setUint16(12, 32, true);     // Bits per pixel
    view.setUint32(14, bmpDataSize, true); // Size of BMP data
    view.setUint32(18, 22, true);     // Offset to BMP data

    // BMP Info Header (40 bytes) - starts at offset 22
    let offset = 22;
    view.setUint32(offset, 40, true); offset += 4;     // Header size
    view.setInt32(offset, targetSize, true); offset += 4;  // Width
    view.setInt32(offset, targetSize * 2, true); offset += 4; // Height (doubled for ICO)
    view.setUint16(offset, 1, true); offset += 2;      // Planes
    view.setUint16(offset, 32, true); offset += 2;     // Bits per pixel
    view.setUint32(offset, 0, true); offset += 4;      // Compression
    view.setUint32(offset, 0, true); offset += 4;      // Image size
    view.setUint32(offset, 0, true); offset += 4;      // X pixels per meter
    view.setUint32(offset, 0, true); offset += 4;      // Y pixels per meter
    view.setUint32(offset, 0, true); offset += 4;      // Colors used
    view.setUint32(offset, 0, true); offset += 4;      // Important colors

    // Pixel data (BGRA, bottom-up)
    for (let y = targetSize - 1; y >= 0; y--) {
        for (let x = 0; x < targetSize; x++) {
            const i = (y * targetSize + x) * 4;
            uint8[offset++] = data[i + 2]; // Blue
            uint8[offset++] = data[i + 1]; // Green
            uint8[offset++] = data[i];     // Red
            uint8[offset++] = data[i + 3]; // Alpha
        }
    }

    // AND mask (transparency mask - all 0s for fully visible)
    const andMaskSize = Math.ceil(targetSize / 8) * targetSize;
    for (let i = 0; i < andMaskSize; i++) {
        uint8[offset++] = 0;
    }

    return new Blob([buffer], { type: 'image/x-icon' });
}
