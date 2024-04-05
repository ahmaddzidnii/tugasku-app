"use client";

import { Class } from "@prisma/client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export const AccordionSidebar = ({ data }: { data: Class[] }) => {
  return (
    <Accordion
      type="single"
      className="w-full"
      collapsible
    >
      {data.map((item) => (
        <AccordionItem
          key={item.classId}
          value={item.classId}
          className="h-auto"
        >
          <AccordionTrigger className="text-start">
            <div className="flex items-center">
              <Link
                href={`/u/c/${item.classId}`}
                className="me-4"
              >
                <Avatar>
                  <AvatarImage
                    title={item.name}
                    src={`https://ui-avatars.com/api/?name=${item.name}`}
                  />
                </Avatar>
              </Link>
              <Link href={`/u/c/${item.classId}`}>
                <h2
                  title={item.name}
                  className="line-clamp-1"
                >
                  {item.name}
                </h2>
                <p
                  title={item.teacherName}
                  className="text-sm text-muted-foreground line-clamp-1"
                >
                  {item.teacherName}
                </p>
              </Link>
            </div>
          </AccordionTrigger>
          <AccordionContent>{item.description}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
