"use client";

import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { PropsWithChildren } from "react";

const HomeLayout = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  return (
    <div className="">
      {user && <Navbar />}
      <div className="">{children}</div>
    </div>
  );
};

export default HomeLayout;
