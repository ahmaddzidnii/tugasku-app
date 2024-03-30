"use client";
import { useScrollNavbar } from "@/hooks/use-scroll-navbar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const NavbarMarketing = () => {
  const { scrolled } = useScrollNavbar();
  return (
    <header
      className={cn(
        "fixed top-0 z-50 flex justify-between items-center py-10 w-full backdrop-blur px-6",
        scrolled && "shadow-sm"
      )}
    >
      <h1 className="text-2xl font-bold">Tugasku</h1>
      <nav className="flex gap-4 text-sm">
        <Link href="/">Discord</Link>
        <Link href="/">GitHub</Link>
      </nav>
    </header>
  );
};
