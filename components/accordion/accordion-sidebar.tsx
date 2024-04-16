"use client";

import { Class } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { EmptyDataUi } from "../error-components/empty-data-ui";

export const AccordionSidebar = ({ data }: { data: Class[] }) => {
  const pathname = usePathname();

  return (
    <div>
      {data.length !== 0 ? (
        data.map((item, i) => {
          const isLast = i === data.length - 1;
          return (
            <div
              key={item.classId}
              className={cn(
                "flex items-center py-4 px-2 rounded-md",
                !isLast && "border-b",
                pathname.split("/")[3] === item.classId && "bg-secondary"
              )}
            >
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
                  className={cn("line-clamp-1")}
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
          );
        })
      ) : (
        <EmptyDataUi text="Tidak ada kelas!" />
      )}
    </div>
  );

  // return (
  //   <Accordion
  //     type="single"
  //     className="w-full"
  //     collapsible
  //   >
  //     {data.length !== 0 ? (
  //       data.map((item, i) => {
  //         const isLast = i === data.length - 1;
  //         return (
  //           <AccordionItem
  //             key={item.classId}
  //             value={item.classId}
  //             className={cn("h-auto", isLast && "border-none")}
  //           >
  //             <AccordionTrigger
  //               onClick={() => {}}
  //               className={cn(" text-start")}
  //             >
  //               <div className="flex items-center">
  //                 <Link
  //                   href={`/u/c/${item.classId}`}
  //                   className="me-4"
  //                 >
  //                   <Avatar>
  //                     <AvatarImage
  //                       title={item.name}
  //                       src={`https://ui-avatars.com/api/?name=${item.name}`}
  //                     />
  //                   </Avatar>
  //                 </Link>
  //                 <Link href={`/u/c/${item.classId}`}>
  //                   <h2
  //                     title={item.name}
  //                     className={cn(
  //                       "line-clamp-1",
  //                       pathname.split("/")[3] === item.classId && "font-extrabold"
  //                     )}
  //                   >
  //                     {item.name}
  //                   </h2>
  //                   <p
  //                     title={item.teacherName}
  //                     className="text-sm text-muted-foreground line-clamp-1"
  //                   >
  //                     {item.teacherName}
  //                   </p>
  //                 </Link>
  //               </div>
  //             </AccordionTrigger>
  //             <AccordionContent>{item.description}</AccordionContent>
  //           </AccordionItem>
  //         );
  //       })
  //     ) : (
  //       <p>Tidak ada data kelas saat ini</p>
  //     )}
  //   </Accordion>
  // );
};
