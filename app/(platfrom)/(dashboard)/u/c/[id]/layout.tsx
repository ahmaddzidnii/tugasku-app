import { Plus } from "lucide-react";
import React from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { getClassById } from "@/service/get-all-class";
import { SubNavAction } from "./_components/subnav-action";
import { NotFoundUI } from "@/components/error-components/not-found-ui";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const ctx = await getClassById(params.id);
  if (!ctx) {
    return {
      title: "Not Found",
    };
  }
  return {
    title: `${ctx?.name}`,
  };
}
const CoridorClassLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const ctx = await getClassById(params.id);
  if (!ctx) {
    return <NotFoundUI />;
  }
  return (
    <>
      <div className="sticky mb-5 bg-background h-14 w-full flex items-center px-4 justify-between border-b">
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
          <SubNavAction id={params.id} />
        </div>
      </div>
      {children}
    </>
  );
};

export default CoridorClassLayout;
