import { getAllClass } from "@/service/get-all-class";
import { SidebarDesktop } from "./sidebar-dekstop";
import { SidebarMobile } from "./sidebar-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { HiOutlineHome } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/spinner";
import { Suspense } from "react";
import { TopMenuSidebar } from "./top-menu-sidebar";

const SidebarFallback = () => {
  return (
    <div className="flex h-[20vh] justify-center items-center">
      <Spinner className="animate-spin fill-primary w-10 h-10" />
    </div>
  );
};
export const SidebarDashboard = () => {
  return (
    <>
      {/* <SidebarMobile data={classes} /> */}
      <aside className="h-full z-40 ps-5 pe-1 hidden fixed left-0 w-72 border-e-2 border-muted md:block">
        <ScrollArea
          className="max-h-screen pt-2 h-screen"
          scrollHideDelay={1}
        >
          {/* Sidebar top menu */}
          <TopMenuSidebar />
          <Separator className="my-2" />
          {/* Sidebar top menu */}

          {/* Sidebar bottom menu */}
          <Suspense fallback={<SidebarFallback />}>
            <SidebarDesktop />
          </Suspense>

          {/* Sidebar bottom menu */}
        </ScrollArea>
      </aside>
    </>
  );
};
