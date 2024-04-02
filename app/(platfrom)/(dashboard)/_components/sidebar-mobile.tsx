"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSidebar } from "@/hooks/use-sidebar";
import { SidebarContent } from "./sidebar-dekstop";

export const SidebarMobile = () => {
  const sidebar = useSidebar();
  return (
    <div className="md:hidden">
      <Sheet
        modal={false}
        open={sidebar.isOpen}
        onOpenChange={sidebar.onClose}
      >
        <SheetContent
          side="left"
          className="md:hidden flex flex-col"
        >
          <h1 className="mb-3">Sidebar Mobile</h1>

          <SidebarContent />
        </SheetContent>
      </Sheet>
    </div>
  );
};
