"use client";

import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { useSidebar } from "@/hooks/use-sidebar";
import { SidebarContent } from "./sidebar-dekstop";
import { Classes } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HiOutlineHome } from "react-icons/hi2";
import { Separator } from "@radix-ui/react-select";
import { usePathname } from "next/navigation";

export const SidebarMobile = ({ data }: { data: Classes }) => {
  const sidebar = useSidebar();
  const pathname = usePathname();
  return (
    <div className="md:hidden">
      <Sheet
        open={sidebar.isOpen}
        onOpenChange={sidebar.onClose}
      >
        <SheetContent
          side="left"
          className="md:hidden flex flex-col w-80"
        >
          <ScrollArea
            className="h-screen mt-5"
            scrollHideDelay={0}
          >
            <div className="me-5">
              <Link
                href="/u"
                className={cn("flex items-center p-2 rounded-xl", pathname === "/u" && "bg-muted")}
              >
                <HiOutlineHome className="w-10 h-10 me-4" />
                Beranda
              </Link>
              <Separator className="my-5" />
              <SidebarContent data={data} />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};
