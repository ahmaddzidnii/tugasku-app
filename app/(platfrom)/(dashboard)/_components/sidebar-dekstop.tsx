import { AccordionSidebar } from "@/components/accordion/accordion-sidebar";
import { Classes } from "./types";

export const SidebarContent = ({ data }: { data: Classes }) => {
  return (
    <div className="max-h-full pe-4 hover:overflow-y-auto scrollbar scrollbar-track-background scrollbar-thumb-primary text-justify">
      <h1>Semua Kelas</h1>
      <AccordionSidebar data={data} />
    </div>
  );
};

export const SidebarDesktop = ({ data }: { data: Classes }) => {
  return (
    <aside className="h-full z-40 pt-16 ps-5 pe-1 hidden fixed left-0 w-72 border-e-2 border-muted md:block">
      <SidebarContent data={data} />
    </aside>
  );
};
