import Link from "next/link";
import { Button } from "../ui/button";
import { Meteors } from "../ui/ui-aceternity/meteors";

interface CardClassProps {
  name: string;
  description?: string | undefined | null;
  classId: string;
  teacherName: string;
  meteor_number?: number;
}
export const CardClass = ({
  classId,
  name,
  description,
  teacherName,
  meteor_number = 5,
}: CardClassProps) => {
  return (
    <div className="w-full relative z-10 flex flex-col rounded-2xl shadow-sm bg-bacground border border-primary-800  h-full overflow-hidden">
      <img
        src="https://www.gstatic.com/classroom/themes/img_code.jpg"
        alt=""
        className="h-full"
      />
      <div className="relative  p-4 flex flex-col justify-end items-start">
        <h1 className="font-bold text-xl text-foreground relative z-50 line-clamp-2">{name}</h1>
        <p className=" mb-4 text-muted-foreground text-sm line-clamp-1">{teacherName}</p>

        <p className="font-normal text-base text-muted-foreground mb-4 relative z-50 text-justify  line-clamp-3">
          {!description ? "Kelas ini tidak memiliki deskripsi" : description}
        </p>

        <div className="flex">
          <Button
            variant="default"
            className="border px-4 py-1 rounded-lg"
          >
            <Link href={`/app/c/${classId}`}>Lihat catatan tugas</Link>
          </Button>
        </div>

        {/* Meaty part - Meteor effect */}
        <Meteors number={meteor_number} />
      </div>
    </div>
  );
};
