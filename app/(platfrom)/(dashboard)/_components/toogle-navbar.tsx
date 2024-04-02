"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { RiMenu2Line } from "react-icons/ri";

export const ToogleNavbar = () => {
  const sidebar = useSidebar();
  return (
    <Button
      variant="ghost"
      className="p-0 me-5 md:hidden"
      onClick={() => sidebar.onOpen()}
    >
      <RiMenu2Line className="w-6 h-6" />
    </Button>
  );
};
