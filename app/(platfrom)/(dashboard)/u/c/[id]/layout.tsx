import React from "react";

import { getClassById } from "@/service/get-all-class";
import { SubNavAction } from "./_components/subnav-action";
import { NotFoundUI } from "@/components/error-components/not-found-ui";
import { BreadcrumbClass } from "@/components/breadcrumb/breadcumb-class";

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
        <BreadcrumbClass />
        <div className="flex items-center">
          <SubNavAction id={params.id} />
        </div>
      </div>
      {children}
    </>
  );
};

export default CoridorClassLayout;
