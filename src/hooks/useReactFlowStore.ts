import { combine } from "zustand/middleware";
import { create } from "zustand/react";
import { Node, Edge, Viewport } from "@xyflow/react";

interface State {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
}

interface Actions {
  setNodesState: (next: Node[] | ((nodes: Node[]) => Node[])) => void;
  setEdgesState: (next: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  setViewportState: (
    next: Viewport | ((viewport: Viewport) => Viewport),
  ) => void;
  save: () => void;
  load: () => void;
}

const STORAGE_KEY = "react-flow-carto";

const defaultState: State = {
  nodes: [],
  edges: [],
  viewport: { x: 0, y: 0, zoom: 1 },
};

const saveToStorage = (state: State) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const useReactFlowStore = create(
  combine<State, Actions>(defaultState, (set, get) => ({
    setNodesState: (updater) =>
      set((state) => {
        const nodes =
          typeof updater === "function" ? updater(state.nodes) : updater;
        saveToStorage({ ...state, nodes });
        return { nodes };
      }),

    setEdgesState: (updater) =>
      set((state) => {
        const edges =
          typeof updater === "function" ? updater(state.edges) : updater;
        saveToStorage({ ...state, edges });
        return { edges };
      }),

    setViewportState: (updater) =>
      set((state) => {
        const viewport =
          typeof updater === "function" ? updater(state.viewport) : updater;
        saveToStorage({ ...state, viewport });
        return { viewport };
      }),

    save: () => {
      saveToStorage(get());
    },

    load: () => {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      try {
        const parsed: State = JSON.parse(raw);
        set({
          nodes: parsed.nodes || [],
          edges: parsed.edges || [],
          viewport: parsed.viewport || defaultState.viewport,
        });
      } catch (err) {
        console.warn("[Zustand] Failed to parse state:", err);
      }
    },
  })),
);
