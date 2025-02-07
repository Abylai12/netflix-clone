import { create } from "zustand";

// Define the type for the store's state
interface ContentState {
  contentType: string;
  setContentType: (type: string) => void; // You can type `type` more strictly if needed
}

// Create the zustand store with the defined types
export const useContentStore = create<ContentState>((set) => ({
  contentType: "movie", // Initial state
  setContentType: (type) => set({ contentType: type }),
}));
