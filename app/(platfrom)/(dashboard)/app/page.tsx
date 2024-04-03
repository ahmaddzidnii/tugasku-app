import { Button } from "@/components/ui/button";
import { Meteors } from "@/components/ui/ui-aceternity/meteors";
import { TextGenerateEffect } from "@/components/ui/ui-aceternity/text-generate-effect";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const user = await currentUser();
  return {
    title: `${user?.username} - Dashboard`,
    description: "Dashboard",
  };
}

// img : https://www.gstatic.com/classroom/themes/img_code.jpg

const PlatformMainPage = async () => {
  return (
    <>
      <div className="pt-16 px-5 w-full">
        <div className="flex justify-between items-center">
          <TextGenerateEffect
            className="mb-5 text-sm md:text-3xl xl:text-5xl font-extrabold"
            words="Daftar Kelas"
          />
          <div>
            <Button
              title="Tambah kelas"
              variant="outline"
              className="border px-4 py-1 rounded-lg"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="card-container">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="w-full relative z-10 flex flex-col rounded-2xl shadow-sm bg-bacground border border-primary-800  h-full overflow-hidden"
            >
              <img
                src="https://www.gstatic.com/classroom/themes/img_code.jpg"
                alt=""
                className="h-full"
              />
              <div className="relative  p-4 flex flex-col justify-end items-start">
                <h1 className="font-bold text-xl text-foreground relative z-50 line-clamp-2">
                  Pemrograman Platform Web
                </h1>
                <p className=" mb-4 text-muted-foreground text-sm line-clamp-1">
                  Lorem Ipsum Dolor, S.IP, M.Si., Ph.D
                </p>

                <p className="font-normal text-base text-muted-foreground mb-4 relative z-50 text-justify  line-clamp-3">
                  I don&apos;t know what to write so I&apos;ll just paste
                  something cool here. One more sentence because lorem ipsum is
                  just unacceptable. Won&apos;t ChatGPT the shit out of this.
                </p>

                <div className="flex">
                  <Button
                    variant="default"
                    className="border px-4 py-1 rounded-lg"
                  >
                    <Link href={`/app/class/${i + 1}`}>
                      Lihat catatan tugas
                    </Link>
                  </Button>
                </div>

                {/* Meaty part - Meteor effect */}
                <Meteors number={5} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlatformMainPage;
