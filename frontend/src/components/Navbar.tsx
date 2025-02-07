"use client";

import { useState } from "react";
import { LogOut, Menu, Search } from "lucide-react";
import { useContentStore } from "../store/content";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const { setContentType } = useContentStore();

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link href="/dashboard">
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>

        <div className="hidden sm:flex gap-2 items-center">
          <Link
            href="/dashboard"
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            href="/dashboard"
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            Tv Shows
          </Link>
          <Link href="/search-history" className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-4 items-center z-50">
        <Link href="/search">
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user?.image}
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="w-full text-white sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            href={"/dashboard"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            href={"/dashboard"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Tv Shows
          </Link>
          <Link
            href={"/search-history"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};
export default Navbar;
