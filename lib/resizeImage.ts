/**
 * Browser-only: shrinks a photo before upload so it stays well under the
 * server's 4 MB limit and loads fast on the site. Never upscales.
 */

type Decoded = { source: CanvasImageSource; width: number; height: number; release: () => void };

/**
 * Prefers createImageBitmap (applies the photo's EXIF rotation explicitly). Some phone
 * browsers reject it or its `imageOrientation` option, so fall back to an <img> element,
 * which modern browsers also draw with EXIF rotation applied.
 */
async function decode(file: File): Promise<Decoded> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    return { source: bitmap, width: bitmap.width, height: bitmap.height, release: () => bitmap.close() };
  } catch {
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return { source: img, width: img.naturalWidth, height: img.naturalHeight, release: () => URL.revokeObjectURL(url) };
    } catch (error) {
      URL.revokeObjectURL(url);
      throw error;
    }
  }
}

export async function resizeImageFile(file: File, maxEdge = 1600, quality = 0.85): Promise<Blob> {
  const image = await decode(file);
  try {
    const scale = Math.min(1, maxEdge / Math.max(image.width, image.height));
    const width = Math.round(image.width * scale);
    const height = Math.round(image.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is not supported in this browser");

    // JPEG has no transparency: paint white behind transparent PNGs instead of black.
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(image.source, 0, 0, width, height);

    return await new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Could not encode the photo"))),
        "image/jpeg",
        quality
      );
    });
  } finally {
    image.release();
  }
}
