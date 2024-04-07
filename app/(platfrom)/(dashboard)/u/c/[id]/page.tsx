import { notFound } from "next/navigation";
import React from "react";

import { getClassById } from "@/service/get-all-class";

const CoridorClassPage = async ({ params }: { params: { id: string } }) => {
  const classById = await getClassById(params.id);
  if (!classById) return notFound();
  return (
    <div className="text-3xl px-4 flex flex-col">
      <div className="w-full h-[200px] aspect-video rounded-lg relative overflow-hidden">
        <img
          src={classById.bannerImageUrl}
          alt={classById.name}
          loading="lazy"
          className="absolute w-full h-full object-cover"
        />

        <div className="relative  p-4 flex flex-col justify-end items-start text-white">
          <p className="fonst-bold text-xl md:text-3xl  max-w-[390px] line-clamp-1">
            {classById.name}
          </p>
          <p className="font-normal text-base">{classById.teacherName}</p>
        </div>
      </div>
      <div className="w-full p-4 shadow-sm">
        <p>
          {classById.description ? classById.description : "Kelas ini tidak memiliki deskripsi"}
        </p>
      </div>
    </div>
  );
};

export default CoridorClassPage;
