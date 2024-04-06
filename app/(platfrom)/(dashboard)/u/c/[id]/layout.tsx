import { Plus } from "lucide-react";
import React from "react";
import { IoMdSettings } from "react-icons/io";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const CoridorClassLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  return (
    <>
      <div className="sticky  z-[100] bg-background h-14 w-full flex items-center px-4 justify-between border-b">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/u/c/${params.id}`}>Ringkasan</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              |
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/u/c/${params.id}/task`}>Tugas</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center">
          <Button
            size="icon"
            variant="ghost"
            title="Tambahkan Tugas"
          >
            <Plus />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            title="Pengaturan"
          >
            <Link href={`/u/c/${params.id}/settings`}>
              <IoMdSettings className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      </div>
      {children}
    </>
  );
};

export default CoridorClassLayout;
