"use client";

import { Type, Image, Square, MousePointer } from "lucide-react";
import { useEditorStore, type Tool, type CardElement } from "~/stores/editor-store";

const tools: { id: Tool; icon: React.ElementType; label: string }[] = [
  { id: "select", icon: MousePointer, label: "Select" },
  { id: "text", icon: Type, label: "Text" },
  { id: "image", icon: Image, label: "Image" },
  { id: "rectangle", icon: Square, label: "Rectangle" },
];

function generateId(): string {
  return crypto.randomUUID();
}

export function LeftSidebar() {
  const { card, activeTool, setActiveTool, addElement, selectElement } = useEditorStore();

  const handleToolClick = (tool: Tool) => {
    if (tool === "select") {
      setActiveTool(tool);
      return;
    }

    // For creation tools, add element immediately to center of canvas
    if (!card) return;

    const now = new Date();
    const elementId = generateId();

    let newElement: CardElement;

    switch (tool) {
      case "text":
        newElement = {
          id: elementId,
          cardId: card.id,
          type: "text",
          content: "Double-click to edit",
          x: card.width / 2 - 100,
          y: card.height / 2 - 20,
          width: 200,
          height: 40,
          rotation: 0,
          styles: { fontSize: 24, fontWeight: "normal", color: "#000000" },
          createdAt: now,
          updatedAt: now,
        };
        break;
      case "image":
        newElement = {
          id: elementId,
          cardId: card.id,
          type: "image",
          content: null,
          x: card.width / 2 - 100,
          y: card.height / 2 - 75,
          width: 200,
          height: 150,
          rotation: 0,
          styles: {},
          createdAt: now,
          updatedAt: now,
        };
        break;
      case "rectangle":
        newElement = {
          id: elementId,
          cardId: card.id,
          type: "rectangle",
          content: null,
          x: card.width / 2 - 75,
          y: card.height / 2 - 50,
          width: 150,
          height: 100,
          rotation: 0,
          styles: { backgroundColor: "#e5e7eb", borderRadius: 8 },
          createdAt: now,
          updatedAt: now,
        };
        break;
      default:
        return;
    }

    addElement(newElement);
    selectElement(elementId);
    setActiveTool("select");
  };

  return (
    <aside className="flex w-16 flex-col items-center border-r border-gray-200 bg-white py-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;

          return (
            <button
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
              title={tool.label}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
