import { getClassById } from "@/service/get-all-class";
import { notFound } from "next/navigation";
import React from "react";
import { SettingClass } from "./_components/settings-class";

interface ParamsProps {
  params: {
    id: string;
    slug: [string];
  };
}

const DynamicSlugPage = async ({ params }: ParamsProps) => {
  const verifvedSlug = ["task", "settings"];
  const classById = await getClassById(params.id);
  if (!classById) return notFound();

  if (verifvedSlug.includes(params.slug[0])) {
    switch (params.slug[0]) {
      case "task":
        return <div>task</div>;
      case "settings":
        return <SettingClass classId={params.id} />;
    }
  }
  return notFound();
};

export default DynamicSlugPage;
