import { useState, useEffect } from "react";

interface PreloaderResult {
  images: HTMLImageElement[];
  isLoading: boolean;
  progress: number;
}

export function useImagePreloader(imageUrls: string[]): PreloaderResult {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (imageUrls.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = new Array(imageUrls.length);

    const handleComplete = () => {
      loadedCount++;
      setProgress(Math.round((loadedCount / imageUrls.length) * 100));

      if (loadedCount === imageUrls.length) {
        setImages(loadedImages);
        setIsLoading(false);
      }
    };

    imageUrls.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedImages[index] = img;
        handleComplete();
      };
      img.onerror = () => {
        handleComplete();
      };
    });
  }, [imageUrls]);

  return { images, isLoading, progress };
}
