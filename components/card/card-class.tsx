import Link from "next/link";
import { Button } from "../ui/button";
import { Meteors } from "../ui/ui-aceternity/meteors";
import { Skeleton } from "../ui/skeleton";

interface CardClassProps {
  name: string;
  description?: string | undefined | null;
  classId: string;
  teacherName: string;
  image?: string;
  meteor_number?: number;
}
export const CardClass = ({
  classId,
  name,
  description,
  teacherName,
  image,
  meteor_number = 5,
}: CardClassProps) => {
  return (
    <Link href={`/u/c/${classId}`}>
      <div className="w-full relative z-10 flex flex-col rounded-2xl shadow-sm bg-bacground border border-primary-800  h-full overflow-hidden hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <img
          src={image}
          alt=""
          className="h-full"
        />
        <div className="relative  p-4 flex flex-col justify-end items-start">
          <h1 className="font-bold text-xl text-foreground relative z-50 line-clamp-2">{name}</h1>
          <p className=" mb-4 text-muted-foreground text-sm line-clamp-1">{teacherName}</p>

          <p className="font-normal text-base text-muted-foreground mb-4 relative z-50 text-justify  line-clamp-1">
            {!description ? "Kelas ini tidak memiliki deskripsi" : description}
          </p>

          <div className="flex">
            <Button
              variant="default"
              className="border px-4 py-1 rounded-lg"
            >
              <Link href={`/u/c/${classId}/assignments`}>Lihat catatan tugas</Link>
            </Button>
          </div>

          {/* Meaty part - Meteor effect */}
          <Meteors number={meteor_number} />
        </div>
      </div>
    </Link>
  );
};

export const CardClassSkeleton = () => {
  return (
    <div className="card-container">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="w-full relative z-10 flex flex-col rounded-2xl shadow-sm bg-bacground border border-primary-800  h-full overflow-hidden"
        >
          <Skeleton className="h-24" />
          <div className="relative  p-4 flex flex-col justify-end items-start">
            <Skeleton className="w-full h-5 mb-2" />
            <Skeleton className="w-1/2 h-5 mb-3" />
            <Skeleton className="w-full h-5 mb-3" />
            <div className="flex">
              <Skeleton className="w-32 h-10 px-4 py-1 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
