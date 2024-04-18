"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiHome } from "react-icons/ci";
export const TopMenuSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="me-4">
      <Link
        href="/u"
        className={cn("flex items-center p-2 rounded-xl", pathname === "/u" && "bg-muted")}
      >
        <CiHome className="w-10 h-10 me-4" />
        Beranda
      </Link>
    </div>
  );
};
