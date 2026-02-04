"use client";

import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();

  // Total frames: 120 (000.png to 119.png)
  const totalFrames = 120;

  // Map scroll (0 to 1) to frame index (0 to 119)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const imagePromises: Promise<void>[] = [];

      for (let i = 0; i < totalFrames; i++) {
        const promise = new Promise<void>((resolve, reject) => {
          const img = new Image();
          const fileName = String(i).padStart(3, "0") + ".png";
          img.src = `/sequence/${fileName}`;
          img.onload = () => {
            loadedImages[i] = img; // Store in correct index
            resolve();
          };
          img.onerror = (e) => {
            console.error(`Failed to load image ${fileName}`, e);
            resolve(); // Resolve anyway to avoid blocking
          };
        });
        imagePromises.push(promise);
      }

      await Promise.all(imagePromises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];

    // Calculate scaling for object-fit: cover
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = img.width * (canvas.height / img.height);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = img.height * (canvas.width / img.width);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!isLoaded) return;
    const index = Math.round(latest);
    renderFrame(index);
  });

  // Initial resize and render handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Re-render current frame on resize
        if (isLoaded) {
          renderFrame(Math.round(frameIndex.get()));
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded]); // Re-run when loaded to ensure initial frame draws

  // Draw first frame when loaded
  useEffect(() => {
    if (isLoaded) {
      renderFrame(0);
    }
  }, [isLoaded]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-purple-200/50 animate-pulse">
          Loading AI Experience...
        </div>
      )}
      <canvas ref={canvasRef} className="block w-full h-full object-cover" />

      {/* Gradient Overlays for smooth blending */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#120224] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#120224] to-transparent pointer-events-none" />
    </div>
  );
}
