import { Suspense } from "react";

import { ButtonAddClass } from "@/components/modal/add-class/button-add-class";
import { ListCardClass } from "./_components/list-card-class";
import { CardClassSkeleton } from "@/components/card/card-class";

export const metadata = {
  title: ` Dashboard`,
  description: "Dashboard",
};

const ClassMainPage = () => {
  return (
    <>
      <div className="px-5 w-full">
        <div className="flex justify-between items-center">
          <h1 className="mb-5 mt-2 text-3xl xl:text-5xl font-extrabold">Daftar Kelas</h1>
          <div>
            <ButtonAddClass variant="outline" />
          </div>
        </div>
        <Suspense fallback={<CardClassSkeleton />}>
          <ListCardClass />
        </Suspense>
      </div>
    </>
  );
};

export default ClassMainPage;
