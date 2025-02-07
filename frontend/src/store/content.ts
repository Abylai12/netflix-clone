import { create } from "zustand";

interface ContentState {
  contentType: string;
  setContentType: (type: string) => void;
}

export const useContentStore = create<ContentState>((set) => ({
  contentType: "movie", // Initial state
  setContentType: (type) => set({ contentType: type }),
}));
