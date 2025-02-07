"use client";

import AuthScreen from "@/components/AuthScreen";
import HomeScreen from "@/components/HomeScreen";
import { useAuthStore } from "@/store/auth-user";

const HomePage = () => {
  const { user } = useAuthStore();

  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};
export default HomePage;
