"use client";

import HomeScreen from "@/components/HomeScreen";
import { useAuth } from "@/context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  return <>{user && <HomeScreen />}</>;
};
export default DashboardPage;
