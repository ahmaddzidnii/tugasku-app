"use client";
import { AccordionSidebar } from "@/components/accordion/accordion-sidebar";
import { Classes } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import { HiOutlineHome } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const SidebarContent = ({ data }: { data: Classes }) => {
  const pathname = usePathname();
  const classArchived = data.filter((item) => item.isArchived === true);
  const classActive = data.filter((item) => item.isArchived === false);

  return (
    <div className="pt-2">
      <Link
        href="/u"
        className={cn("flex items-center p-2 rounded-xl", pathname === "/u" && "bg-muted")}
      >
        <HiOutlineHome className="w-10 h-10 me-4" />
        Beranda
      </Link>
      <Separator className="my-5" />
      <div className="pe-4">
        <Accordion
          type="single"
          defaultValue="all"
          collapsible
          className="w-full"
        >
          <AccordionItem value="all">
            <AccordionTrigger>
              <h1 className="text-lg font-semibold ">Semua Kelas</h1>
            </AccordionTrigger>
            <AccordionContent>
              <ScrollArea
                scrollHideDelay={0}
                className=" pe-4"
              >
                <AccordionSidebar data={classActive} />
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="diarsipkan">
            <AccordionTrigger>
              <h1 className="text-lg font-semibold ">Diarsipkan</h1>
            </AccordionTrigger>
            <AccordionContent>
              <ScrollArea
                scrollHideDelay={0}
                className="h-screen pe-4"
              >
                <AccordionSidebar data={classArchived} />
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export const SidebarDesktop = ({ data }: { data: Classes }) => {
  return (
    <aside className="h-full z-40 ps-5 pe-1 hidden fixed left-0 w-72 border-e-2 border-muted md:block">
      <SidebarContent data={data} />
    </aside>
  );
};
