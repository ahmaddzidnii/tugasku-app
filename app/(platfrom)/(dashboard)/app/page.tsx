import { currentUser } from "@clerk/nextjs";

import { ButtonAddClass } from "@/components/modal/add-class/button-add-class";
import { ListCardClass } from "./_components/list-card-class";
import { Suspense } from "react";

export async function generateMetadata() {
  const user = await currentUser();
  return {
    title: `${user?.username} - Dashboard`,
    description: "Dashboard",
  };
}

// img : https://www.gstatic.com/classroom/themes/img_code.jpg

const PlatformMainPage = () => {
  return (
    <>
      <div className="pt-16 px-5 w-full">
        <div className="flex justify-between items-center">
          <h1 className="mb-5 mt-2 text-3xl xl:text-5xl font-extrabold">Daftar Kelas</h1>
          <div>
            <ButtonAddClass variant="outline" />
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ListCardClass />
        </Suspense>
      </div>
    </>
  );
};

export default PlatformMainPage;
