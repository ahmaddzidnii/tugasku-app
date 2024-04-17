"use client";

import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi2";
import { Separator } from "@radix-ui/react-select";
import { usePathname } from "next/navigation";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSidebar } from "@/hooks/use-sidebar";
import { SidebarContent } from "./sidebar-dekstop";
import { Classes } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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
            className="h-screen"
            scrollHideDelay={0}
          >
            <div>
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
