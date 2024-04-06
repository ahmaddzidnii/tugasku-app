import { notFound } from "next/navigation";
import React from "react";

const OptionsPage = ({ params }: { params: { slug: [string] } }) => {
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

export default OptionsPage;
