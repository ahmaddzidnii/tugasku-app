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
import { Classes } from "./types";

export const SidebarMobile = ({ data }: { data: Classes }) => {
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
          className="md:hidden flex flex-col w-80"
        >
          <SheetHeader className="text-start font-bold text-2xl"></SheetHeader>
          <SidebarContent data={data} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
