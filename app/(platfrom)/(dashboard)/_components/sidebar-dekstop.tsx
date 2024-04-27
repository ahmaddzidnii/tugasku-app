import { AccordionSidebar } from "@/components/accordion/accordion-sidebar";
import { Classes } from "./types";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAllClass } from "@/service/get-all-class";
import { SidebarMobile } from "./sidebar-mobile";
import { Badge } from "@/components/ui/badge";

export const SidebarContent = ({ data }: { data: Classes }) => {
  const classArchived = data.filter((item) => item.isArchived === true);
  const classActive = data.filter((item) => item.isArchived === false);

  return (
    <div className="pe-2">
      <Accordion
        type="single"
        defaultValue="all"
        collapsible
        className="w-full"
      >
        <AccordionItem value="all">
          <AccordionTrigger>
            <h1 className="text-lg font-semibold ">
              Semua Kelas <Badge variant="secondary">{classActive.length}</Badge>
            </h1>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pe-2">
              <AccordionSidebar data={classActive} />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="diarsipkan">
          <AccordionTrigger>
            <h1 className="text-lg font-semibold ">
              Diarsipkan <Badge variant="secondary">{classArchived.length}</Badge>
            </h1>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pe-2">
              <AccordionSidebar data={classArchived} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export const SidebarDesktop = async () => {
  const classes = await getAllClass();
  return (
    <>
      <SidebarMobile data={classes} />
      <SidebarContent data={classes} />
    </>
  );
};
