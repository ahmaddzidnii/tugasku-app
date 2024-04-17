"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export const BreadcrumbClass = () => {
  const pathname = usePathname();

  const spesificPath = pathname.split("/")[4];

  const idClass = pathname.split("/")[3];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="flex">
          {spesificPath === undefined ? (
            <BreadcrumbPage>Ringkasan</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={`/u/c/${idClass}`}>Ringkasan</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        |
        <BreadcrumbItem>
          {spesificPath === "assignments" ? (
            <BreadcrumbPage>Tugas</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={`/u/c/${idClass}/assignments`}>Tugas</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
