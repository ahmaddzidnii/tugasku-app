"use client";
import { Class } from "@prisma/client";

import { DescriptionClass } from "./description-class";

export const CoridorClassHeader = ({ classData }: { classData: Class }) => {
  return (
    <>
      <div className="w-full h-[200px] aspect-video rounded-lg relative overflow-hidden">
        <img
          src={classData.bannerImageUrl}
          alt={classData.name}
          loading="lazy"
          className="absolute w-full h-full object-cover"
        />
        <div className="relative  p-4 flex flex-col justify-end items-start text-white">
          <p className="fonst-bold text-xl md:text-3xl  max-w-[390px] line-clamp-1">
            {classData.name}
          </p>
          <p className="font-normal text-base">{classData.teacherName}</p>
        </div>
      </div>
      <DescriptionClass classData={classData} />
    </>
  );
};
