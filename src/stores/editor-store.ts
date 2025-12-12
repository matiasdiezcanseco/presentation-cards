import { create } from "zustand";

export interface CardElement {
  id: string;
  cardId: string;
  type: string;
  content: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  styles: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Card {
  id: string;
  userId: string;
  title: string;
  width: number;
  height: number;
  backgroundColor: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Tool = "select" | "text" | "image" | "rectangle";

interface EditorState {
  // State
  card: Card | null;
  elements: CardElement[];
  selectedElementIds: string[];
  canvasScale: number;
  activeTool: Tool;
  editingElementId: string | null;

  // Card actions
  setCard: (card: Card | null) => void;

  // Element actions
  setElements: (elements: CardElement[]) => void;
  addElement: (element: CardElement) => void;
  updateElement: (id: string, updates: Partial<CardElement>) => void;
  removeElement: (id: string) => void;

  // Selection actions
  setSelectedElementIds: (ids: string[]) => void;
  selectElement: (id: string, multi?: boolean) => void;
  deselectAll: () => void;

  // Tool actions
  setActiveTool: (tool: Tool) => void;
  setEditingElementId: (id: string | null) => void;

  // Canvas actions
  setCanvasScale: (scale: number) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  // Initial state
  card: null,
  elements: [],
  selectedElementIds: [],
  canvasScale: 1,
  activeTool: "select",
  editingElementId: null,

  // Card actions
  setCard: (card) => set({ card }),

  // Element actions
  setElements: (elements) => set({ elements }),

  addElement: (element) =>
    set((state) => ({
      elements: [...state.elements, element],
    })),

  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates, updatedAt: new Date() } : el
      ),
    })),

  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedElementIds: state.selectedElementIds.filter(
        (selectedId) => selectedId !== id
      ),
    })),

  // Selection actions
  setSelectedElementIds: (ids) => set({ selectedElementIds: ids }),

  selectElement: (id, multi = false) =>
    set((state) => ({
      selectedElementIds: multi
        ? state.selectedElementIds.includes(id)
          ? state.selectedElementIds.filter((selectedId) => selectedId !== id)
          : [...state.selectedElementIds, id]
        : [id],
    })),

  deselectAll: () => set({ selectedElementIds: [], editingElementId: null }),

  // Tool actions
  setActiveTool: (tool) => set({ activeTool: tool }),
  setEditingElementId: (id) => set({ editingElementId: id }),

  // Canvas actions
  setCanvasScale: (scale) => set({ canvasScale: scale }),
}));
