import svgServerError from "@/public/svg/server_error.svg";
import { Button } from "@/components/ui/button";

interface InternalServerErrorUIProps {
  withButton?: boolean;
  reset?: () => void;
}

export const InternalServerErrorUI = ({ withButton = true, reset }: InternalServerErrorUIProps) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <img
        src={svgServerError.src}
        alt="server erorr"
        className="w-[300px] h-[300px]"
      />
      <h2 className="text-base md:text-2xl lg:text-3xl font-bold">Something went wrong!</h2>
      {withButton && (
        <Button
          variant="default"
          onClick={() => {
            if (reset) reset();
          }}
          className="mt-4"
        >
          Coba lagi
        </Button>
      )}
    </div>
  );
};
