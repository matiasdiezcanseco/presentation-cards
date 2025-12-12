"use client";

import { useEditorStore } from "~/stores/editor-store";
import { ElementRenderer } from "./element-renderer";

export function Canvas() {
  const { card, elements, deselectAll, setEditingElementId } = useEditorStore();

  if (!card) {
    return null;
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only deselect if clicking directly on canvas, not on an element
    if (e.target === e.currentTarget) {
      deselectAll();
      setEditingElementId(null);
    }
  };

  return (
    <div
      className="relative shadow-2xl"
      style={{
        width: card.width,
        height: card.height,
        backgroundColor: card.backgroundColor,
        overflow: "hidden",
      }}
      onClick={handleCanvasClick}
    >
      {elements.map((element) => (
        <ElementRenderer key={element.id} element={element} />
      ))}

      {elements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-gray-400">
            Click a tool on the left to add elements
          </p>
        </div>
      )}
    </div>
  );
}
