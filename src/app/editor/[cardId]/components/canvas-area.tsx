"use client";

import { useEffect, useRef } from "react";
import { useEditorStore } from "~/stores/editor-store";
import { Canvas } from "./canvas";

export function CanvasArea() {
  const { card, canvasScale, setCanvasScale } = useEditorStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate optimal scale to fit canvas in viewport
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;

        if (card) {
          const padding = 80; // Padding around canvas
          const availableWidth = clientWidth - padding * 2;
          const availableHeight = clientHeight - padding * 2;

          const scaleX = availableWidth / card.width;
          const scaleY = availableHeight / card.height;
          const optimalScale = Math.min(scaleX, scaleY, 1); // Cap at 100%

          setCanvasScale(optimalScale);
        }
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [card, setCanvasScale]);

  if (!card) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Loading canvas...</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex flex-1 items-center justify-center overflow-auto bg-gray-100 dark:bg-gray-900"
      style={{
        backgroundImage:
          "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Scale indicator */}
      <div className="absolute bottom-4 right-4 rounded bg-white/80 px-2 py-1 text-xs text-gray-600 shadow dark:bg-gray-800/80 dark:text-gray-300">
        {Math.round(canvasScale * 100)}%
      </div>

      {/* Canvas wrapper */}
      <div
        style={{
          transform: `scale(${canvasScale})`,
          transformOrigin: "center center",
        }}
      >
        <Canvas />
      </div>
    </div>
  );
}
