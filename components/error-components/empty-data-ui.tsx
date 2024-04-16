import { cn } from "@/lib/utils";
import svg from "@/public/svg/no_data.svg";
export const EmptyDataUi = ({
  text,
  svgClassName,
  textClassName,
}: {
  text: string;
  svgClassName?: string;
  textClassName?: string;
}) => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <img
          src={svg.src}
          alt="svg-notfound"
          className={cn("w-24 h-full", svgClassName)}
        />
        <p className={cn("mt-4 font-bold text-center", textClassName)}>{text}</p>
      </div>
    </div>
  );
};
