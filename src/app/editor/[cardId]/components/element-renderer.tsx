"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditorStore, type CardElement } from "~/stores/editor-store";

interface ElementRendererProps {
  element: CardElement;
}

type ResizeHandle = "nw" | "ne" | "sw" | "se" | "n" | "s" | "e" | "w";

const HANDLE_SIZE = 8;

export function ElementRenderer({ element }: ElementRendererProps) {
  const {
    card,
    selectedElementIds,
    selectElement,
    updateElement,
    editingElementId,
    setEditingElementId,
  } = useEditorStore();

  const isSelected = selectedElementIds.includes(element.id);
  const isEditing = editingElementId === element.id;

  const elementRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; elemX: number; elemY: number } | null>(null);
  const didSelectOnPointerDownRef = useRef(false);

  // Resize state
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef<{
    handle: ResizeHandle;
    startX: number;
    startY: number;
    elemX: number;
    elemY: number;
    elemW: number;
    elemH: number;
  } | null>(null);

  // Text editing state
  const [editText, setEditText] = useState(element.content ?? "");

  // Update editText when element content changes
  useEffect(() => {
    if (!isEditing) {
      setEditText(element.content ?? "");
    }
  }, [element.content, isEditing]);

  // Focus textarea when editing starts
  useEffect(() => {
    if (isEditing && textInputRef.current) {
      textInputRef.current.focus();
      textInputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Skip if we already handled selection in handlePointerDown
    if (didSelectOnPointerDownRef.current) {
      didSelectOnPointerDownRef.current = false;
      return;
    }
    if (!isEditing) {
      selectElement(element.id, e.shiftKey);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (element.type === "text") {
      setEditingElementId(element.id);
    }
  };

  const handleTextBlur = () => {
    updateElement(element.id, { content: editText });
    setEditingElementId(null);
  };

  const handleTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setEditText(element.content ?? "");
      setEditingElementId(null);
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTextBlur();
    }
  };

  // Drag handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isEditing) return;
      if ((e.target as HTMLElement).dataset.resizeHandle) return;

      e.stopPropagation();
      e.preventDefault();

      // Select element and mark that we handled it to avoid double-selection in handleClick
      selectElement(element.id, e.shiftKey);
      didSelectOnPointerDownRef.current = true;

      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        elemX: element.x,
        elemY: element.y,
      };

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [element.id, element.x, element.y, isEditing, selectElement]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (isDragging && dragStartRef.current && card) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;

        // Calculate new position
        let newX = dragStartRef.current.elemX + dx;
        let newY = dragStartRef.current.elemY + dy;

        // Constrain to canvas bounds
        newX = Math.max(0, Math.min(newX, card.width - element.width));
        newY = Math.max(0, Math.min(newY, card.height - element.height));

        updateElement(element.id, { x: newX, y: newY });
      }

      if (isResizing && resizeStartRef.current && card) {
        const { handle, startX, startY, elemX, elemY, elemW, elemH } = resizeStartRef.current;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newX = elemX;
        let newY = elemY;
        let newW = elemW;
        let newH = elemH;

        const minSize = 20;

        // Handle horizontal resize
        if (handle.includes("e")) {
          newW = Math.max(minSize, elemW + dx);
        } else if (handle.includes("w")) {
          const proposedW = elemW - dx;
          if (proposedW >= minSize) {
            newW = proposedW;
            newX = elemX + dx;
          }
        }

        // Handle vertical resize
        if (handle.includes("s")) {
          newH = Math.max(minSize, elemH + dy);
        } else if (handle.includes("n")) {
          const proposedH = elemH - dy;
          if (proposedH >= minSize) {
            newH = proposedH;
            newY = elemY + dy;
          }
        }

        // Constrain to canvas bounds
        newX = Math.max(0, newX);
        newY = Math.max(0, newY);
        newW = Math.min(newW, card.width - newX);
        newH = Math.min(newH, card.height - newY);

        updateElement(element.id, { x: newX, y: newY, width: newW, height: newH });
      }
    },
    [isDragging, isResizing, card, element.id, element.width, element.height, updateElement]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    dragStartRef.current = null;
    resizeStartRef.current = null;
  }, []);

  // Resize handle handlers
  const handleResizePointerDown = useCallback(
    (e: React.PointerEvent, handle: ResizeHandle) => {
      if (isEditing) return;

      e.stopPropagation();
      e.preventDefault();

      setIsResizing(true);
      resizeStartRef.current = {
        handle,
        startX: e.clientX,
        startY: e.clientY,
        elemX: element.x,
        elemY: element.y,
        elemW: element.width,
        elemH: element.height,
      };

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [element.x, element.y, element.width, element.height, isEditing]
  );

  const getHandleCursor = (handle: ResizeHandle): string => {
    const cursors: Record<ResizeHandle, string> = {
      nw: "nwse-resize",
      ne: "nesw-resize",
      sw: "nesw-resize",
      se: "nwse-resize",
      n: "ns-resize",
      s: "ns-resize",
      e: "ew-resize",
      w: "ew-resize",
    };
    return cursors[handle];
  };

  const renderResizeHandles = () => {
    if (!isSelected) return null;

    const handles: { handle: ResizeHandle; style: React.CSSProperties }[] = [
      // Corners
      { handle: "nw", style: { top: -HANDLE_SIZE / 2, left: -HANDLE_SIZE / 2 } },
      { handle: "ne", style: { top: -HANDLE_SIZE / 2, right: -HANDLE_SIZE / 2 } },
      { handle: "sw", style: { bottom: -HANDLE_SIZE / 2, left: -HANDLE_SIZE / 2 } },
      { handle: "se", style: { bottom: -HANDLE_SIZE / 2, right: -HANDLE_SIZE / 2 } },
      // Edges
      { handle: "n", style: { top: -HANDLE_SIZE / 2, left: "50%", marginLeft: -HANDLE_SIZE / 2 } },
      { handle: "s", style: { bottom: -HANDLE_SIZE / 2, left: "50%", marginLeft: -HANDLE_SIZE / 2 } },
      { handle: "e", style: { right: -HANDLE_SIZE / 2, top: "50%", marginTop: -HANDLE_SIZE / 2 } },
      { handle: "w", style: { left: -HANDLE_SIZE / 2, top: "50%", marginTop: -HANDLE_SIZE / 2 } },
    ];

    return handles.map(({ handle, style }) => (
      <div
        key={handle}
        data-resize-handle={handle}
        style={{
          position: "absolute",
          width: HANDLE_SIZE,
          height: HANDLE_SIZE,
          backgroundColor: "#ffffff",
          border: "1px solid #6366f1",
          borderRadius: 2,
          cursor: getHandleCursor(handle),
          ...style,
        }}
        onPointerDown={(e) => handleResizePointerDown(e, handle)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
    ));
  };

  const baseStyles: React.CSSProperties = {
    position: "absolute",
    left: element.x,
    top: element.y,
    width: element.width,
    height: element.height,
    transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
  };

  const selectionStyles: React.CSSProperties = isSelected
    ? {
        outline: "2px solid #6366f1",
        outlineOffset: "1px",
      }
    : {};

  const renderTextElement = () => {
    if (isEditing) {
      return (
        <div
          ref={elementRef}
          style={{
            ...baseStyles,
            ...selectionStyles,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleClick}
        >
          <textarea
            ref={textInputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleTextBlur}
            onKeyDown={handleTextKeyDown}
            style={{
              width: "100%",
              height: "100%",
              resize: "none",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              textAlign: "center",
              fontSize: (element.styles?.fontSize as number) ?? 24,
              fontWeight: (element.styles?.fontWeight as string) ?? "normal",
              color: (element.styles?.color as string) ?? "#000000",
              fontFamily: (element.styles?.fontFamily as string) ?? "inherit",
            }}
          />
          {renderResizeHandles()}
        </div>
      );
    }

    return (
      <div
        ref={elementRef}
        style={{
          ...baseStyles,
          ...selectionStyles,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: (element.styles?.fontSize as number) ?? 24,
          fontWeight: (element.styles?.fontWeight as string) ?? "normal",
          color: (element.styles?.color as string) ?? "#000000",
          fontFamily: (element.styles?.fontFamily as string) ?? "inherit",
        }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {element.content ?? "Text"}
        {renderResizeHandles()}
      </div>
    );
  };

  const renderElement = () => {
    switch (element.type) {
      case "text":
        return renderTextElement();

      case "image":
        return (
          <div
            ref={elementRef}
            style={{
              ...baseStyles,
              ...selectionStyles,
              overflow: "hidden",
            }}
            onClick={handleClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
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
                  pointerEvents: "none",
                }}
                draggable={false}
              />
            ) : (
              <div className="pointer-events-none flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                Image
              </div>
            )}
            {renderResizeHandles()}
          </div>
        );

      case "rectangle":
        return (
          <div
            ref={elementRef}
            style={{
              ...baseStyles,
              ...selectionStyles,
              backgroundColor:
                (element.styles?.backgroundColor as string) ?? "#e5e7eb",
              borderRadius: (element.styles?.borderRadius as number) ?? 0,
              border: element.styles?.border as string,
            }}
            onClick={handleClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {renderResizeHandles()}
          </div>
        );

      default:
        // Generic placeholder for unknown element types
        return (
          <div
            ref={elementRef}
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
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <span className="pointer-events-none text-xs text-gray-500">{element.type}</span>
            {renderResizeHandles()}
          </div>
        );
    }
  };

  return renderElement();
}
