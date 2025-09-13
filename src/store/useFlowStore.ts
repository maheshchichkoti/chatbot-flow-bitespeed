// /store/useFlowStore.ts
import { create } from "zustand";

interface FlowState {
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  selectedNodeId: null,
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
}));
