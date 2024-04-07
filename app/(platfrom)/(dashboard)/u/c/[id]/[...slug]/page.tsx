import { getClassById } from "@/service/get-all-class";
import { notFound } from "next/navigation";
import React from "react";

interface ParamsProps {
  params: {
    id: string;
    slug: [string];
  };
}

const DynamicSlugPage = ({ params }: ParamsProps) => {
  const verifvedSlug = ["task", "settings"];

  if (verifvedSlug.includes(params.slug[0])) {
    switch (params.slug[0]) {
      case "task":
        return <div>task</div>;
      case "settings":
        return <div>settings</div>;
    }
  }
  return notFound();
};

export default DynamicSlugPage;
