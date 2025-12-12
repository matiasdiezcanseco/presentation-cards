"use client";

import { useEditorStore, type CardElement } from "~/stores/editor-store";

interface ElementRendererProps {
  element: CardElement;
}

export function ElementRenderer({ element }: ElementRendererProps) {
  const { selectedElementIds, selectElement } = useEditorStore();
  const isSelected = selectedElementIds.includes(element.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id, e.shiftKey);
  };

  const baseStyles: React.CSSProperties = {
    position: "absolute",
    left: element.x,
    top: element.y,
    width: element.width,
    height: element.height,
    transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
    cursor: "pointer",
  };

  const selectionStyles: React.CSSProperties = isSelected
    ? {
        outline: "2px solid #6366f1",
        outlineOffset: "1px",
      }
    : {};

  const renderElement = () => {
    switch (element.type) {
      case "text":
        return (
          <div
            style={{
              ...baseStyles,
              ...selectionStyles,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: (element.styles?.fontSize as number) ?? 16,
              fontWeight: (element.styles?.fontWeight as string) ?? "normal",
              color: (element.styles?.color as string) ?? "#000000",
              fontFamily: (element.styles?.fontFamily as string) ?? "inherit",
            }}
            onClick={handleClick}
          >
            {element.content ?? "Text"}
          </div>
        );

      case "image":
        return (
          <div
            style={{
              ...baseStyles,
              ...selectionStyles,
              overflow: "hidden",
            }}
            onClick={handleClick}
          >
            {element.content ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={element.content}
                alt="Card element"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                Image
              </div>
            )}
          </div>
        );

      case "rectangle":
        return (
          <div
            style={{
              ...baseStyles,
              ...selectionStyles,
              backgroundColor:
                (element.styles?.backgroundColor as string) ?? "#e5e7eb",
              borderRadius: (element.styles?.borderRadius as number) ?? 0,
              border: element.styles?.border as string,
            }}
            onClick={handleClick}
          />
        );

      default:
        // Generic placeholder for unknown element types
        return (
          <div
            style={{
              ...baseStyles,
              ...selectionStyles,
              backgroundColor: "#f3f4f6",
              border: "1px dashed #9ca3af",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleClick}
          >
            <span className="text-xs text-gray-500">{element.type}</span>
          </div>
        );
    }
  };

  return renderElement();
}
