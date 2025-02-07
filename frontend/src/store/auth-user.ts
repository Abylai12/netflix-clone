import axios from "@/utils/axios-instance";

import toast from "react-hot-toast";
import { create } from "zustand";

// Define the types for the user and credentials
interface User {
  id: string;
  email: string;
  userName: string;
  image: string;
}

interface Credentials {
  email: string;
  password: string;
  username: string;
}
interface Login {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isSigningUp: boolean;
  isCheckingAuth: boolean;
  isLoggingOut: boolean;
  isLoggingIn: boolean;
  signup: (credentials: Credentials) => Promise<void>;
  login: (credentials: Login) => Promise<void>;
  logout: () => Promise<void>;
  authCheck: () => Promise<void>;
}

// Create the zustand store with the defined types
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  signup: async (credentials) => {
    set({ isSigningUp: true }); // Set loading state
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);

      // Check for successful response
      if (response.status === 200 && response.data.user) {
        set({ user: response.data.user, isSigningUp: false });
        toast.success("Account created successfully");
      } else {
        // Handle unexpected response
        set({ user: null, isSigningUp: false });
        toast.error(
          response.data.message || "Signup failed. Please try again."
        );
      }
    } catch (error: any) {
      // Handle errors
      set({ isSigningUp: false, user: null });

      // Display error message from the backend or a generic message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Signup failed. Please try again.";
      toast.error(errorMessage);
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
    } catch (error: any) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response?.data?.message || "Login failed");
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error: any) {
      set({ isLoggingOut: false });
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error: any) {
      set({ isCheckingAuth: false, user: null });
      // toast.error(error.response?.data?.message || "An error occurred");
    }
  },
}));
