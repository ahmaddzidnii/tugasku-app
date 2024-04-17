"use client";
import { cn } from "@/lib/utils";
import { Class } from "@prisma/client";
import { useEffect, useState } from "react";
import TextTruncate from "react-text-truncate";

export const DescriptionClass = ({ classData }: { classData: Class }) => {
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
      <div className="w-full p-4 shadow-sm bg-secondary mt-5 rounded-lg ">
        <h1 className="text-sm font-semibold">Deskripsi Kelas:</h1>
        {isTruncated && (
          <TextTruncate
            text={
              classData.description ? classData.description : "Kelas ini tidak memiliki deskripsi"
            }
            element="p"
            line={3}
            containerClassName={cn("text-sm text-justify")}
            textTruncateChild={
              <span
                role="button"
                className="font-bold"
                onClick={() => setIsTruncated(false)}
              >
                Lebih banyak
              </span>
            }
          />
        )}
        {!isTruncated && (
          <div>
            <p className="text-sm text-justify">{classData.description}</p>
            <span
              role="button"
              className="font-bold text-sm"
              onClick={() => setIsTruncated(true)}
            >
              Lebih sedikit
            </span>
          </div>
        )}
      </div>
    </>
  );
};
