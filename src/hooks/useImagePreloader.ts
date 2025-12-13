import { useState, useEffect } from 'react';
import { getImage } from '@/utils/getImage';
import { DragonCardType } from '@/types/DragonCardType';

export const useImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const imagesToLoad = [
      // Background
      getImage('dragon-bg', 'background'),

      // Card backface
      getImage('backface'),

      // All dragon cards
      DragonCardType.earth,
      DragonCardType.fire,
      DragonCardType.empty,
      DragonCardType.frost,
      DragonCardType.shadow,
      DragonCardType.storm,
    ];

    let loadedCount = 0;
    const totalImages = imagesToLoad.length;

    const promises = imagesToLoad.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
          resolve();
        };

        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
          resolve(); // Resolve anyway to not block loading
        };

        img.src = src;
      });
    });

    Promise.all(promises).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  return { imagesLoaded, loadingProgress };
};