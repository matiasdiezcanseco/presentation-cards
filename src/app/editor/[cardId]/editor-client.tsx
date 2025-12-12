"use client";

import { useEffect } from "react";
import { useEditorStore, type Card, type CardElement } from "~/stores/editor-store";
import { TopBar } from "./components/top-bar";
import { LeftSidebar } from "./components/left-sidebar";
import { RightSidebar } from "./components/right-sidebar";
import { CanvasArea } from "./components/canvas-area";

interface EditorClientProps {
  card: Card;
  elements: CardElement[];
}

export function EditorClient({ card, elements }: EditorClientProps) {
  const { setCard, setElements } = useEditorStore();

  // Initialize store with server data
  useEffect(() => {
    setCard(card);
    setElements(elements);
  }, [card, elements, setCard, setElements]);

  return (
    <>
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <CanvasArea />
        <RightSidebar />
      </div>
    </>
  );
}
