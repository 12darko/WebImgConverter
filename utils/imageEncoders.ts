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
