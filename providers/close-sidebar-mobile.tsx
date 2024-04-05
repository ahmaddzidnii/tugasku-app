"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useSidebar } from "@/hooks/use-sidebar";

export const CloseSidebarMobile = () => {
  const sidebar = useSidebar();
  const pathname = usePathname();

  useEffect(() => {
    sidebar.onClose();
  }, [pathname]);
  return null;
};
