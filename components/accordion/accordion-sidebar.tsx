"use client";

import { Class } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const AccordionSidebar = ({ data }: { data: Class[] }) => {
  const pathname = usePathname();

  return (
    <Accordion
      type="single"
      className="w-full"
      collapsible
    >
      {data.length !== 0 ? (
        data.map((item, i) => {
          const isLast = i === data.length - 1;
          return (
            <AccordionItem
              key={item.classId}
              value={item.classId}
              className={cn("h-auto", isLast && "border-none")}
            >
              <AccordionTrigger
                onClick={() => {}}
                className={cn(" text-start")}
              >
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
                      className={cn(
                        "line-clamp-1",
                        pathname.split("/")[3] === item.classId && "font-extrabold"
                      )}
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
          );
        })
      ) : (
        <p>Tidak ada data kelas saat ini</p>
      )}
    </Accordion>
  );
};
