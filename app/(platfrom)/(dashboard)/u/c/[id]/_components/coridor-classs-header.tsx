"use client";
import { Class } from "@prisma/client";
import { useEffect, useState } from "react";
import TextTruncate from "react-text-truncate";
export const CoridorClassHeader = ({ classData }: { classData: Class }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
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
      <div className="w-full p-4 shadow-sm bg-secondary mt-5 rounded-lg ">
        <h1 className="text-sm font-semibold">Deskripsi Kelas:</h1>
        <TextTruncate
          text={
            classData.description ? classData.description : "Kelas ini tidak memiliki deskripsi"
          }
          element="p"
          line={isTruncated ? 3 : 0}
          containerClassName="text-sm text-justify"
          onToggled={(b) => setIsTruncated(b)}
          textTruncateChild={
            <span
              role="button"
              className="font-bold"
              onClick={() => {
                setIsTruncated(false);
              }}
            >
              Lebih banyak
            </span>
          }
        />

        {isTruncated && (
          <span
            role="button"
            className="text-sm font-bold"
            onClick={() => {
              setIsTruncated(true);
            }}
          >
            Lebih sedikit
          </span>
        )}
      </div>
    </>
  );
};
