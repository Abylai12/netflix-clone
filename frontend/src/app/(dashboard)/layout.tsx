"use client";

import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/auth-user";
import { PropsWithChildren } from "react";

const HomeLayout = ({ children }: PropsWithChildren) => {
  const { user } = useAuthStore();
  return (
    <div className="">
      {user && <Navbar />}
      <div className="">{children}</div>
    </div>
  );
};

export default HomeLayout;
