"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { apiURL } from "@/utils/api-url";
import axios from "axios";
import axiosInstance from "@/utils/axios-instance";

interface User {
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

interface AuthContextProps {
  user: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  signup: (credentials: Credentials) => Promise<void>;
  login: (credentials: Login) => Promise<void>;
  logout: () => void;
  authCheck: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  signup: async () => {},
  login: async () => {},
  logout: () => {},
  authCheck: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const signup = async ({ email, password, username }: Credentials) => {
    setIsSigningUp(true);
    try {
      const response = await axios.post(`${apiURL}/api/v1/auth/signup`, {
        data: { email, password, username },
      });

      if (response.status === 200 && response.data.newUser) {
        setUser(response.data.newUser);
        toast.success("Account created successfully");
        router.push("/login");
      } else {
        toast.error(
          response.data.message || "Signup failed. Please try again."
        );
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsSigningUp(false);
    }
  };

  const login = async ({ email, password }: Login) => {
    setIsLoggingIn(true);
    try {
      const response = await axios.post(`${apiURL}/api/v1/auth/login`, {
        email,
        password,
      });

      if (response.status === 200 && response.data.user) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        setToken(response.data.token);
        toast.success("Logged in successfully");
        router.push("/dashboard");
      } else {
        toast.error(response.data.message || "Login failed. Please try again.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/home");
  };

  const authCheck = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/auth/authCheck");
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    if (token) {
      authCheck();
    } else {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isSigningUp,
        isLoggingIn,
        signup,
        login,
        logout,
        authCheck,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
