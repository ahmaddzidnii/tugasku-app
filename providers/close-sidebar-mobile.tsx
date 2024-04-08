"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

import { useSidebar } from "@/hooks/use-sidebar";

export const CloseSidebarMobile = () => {
  const sidebar = useSidebar();
  const pathname = usePathname();
  const windowSize = useWindowSize() as { width: number; height: number };

  useEffect(() => {
    if (windowSize.width > 768) {
      if (sidebar.isOpen) {
        sidebar.onClose();
      }
    }
  }, [windowSize.width]);
  useEffect(() => {
    sidebar.onClose();
  }, [pathname]);
  return null;
};
