"use client"; // Error components must be Client Components

import { useEffect } from "react";
import svgServerError from "@/public/svg/server_error.svg";
import { Button } from "@/components/ui/button";

export default function PlatformError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <img
        src={svgServerError.src}
        alt="server erorr"
        className="w-[300px] h-[300px]"
      />
      <h2 className="text-base md:text-2xl lg:text-3xl font-bold">Something went wrong!</h2>
      <Button
        variant="default"
        onClick={() => reset()}
        className="mt-4"
      >
        Coba lagi
      </Button>
    </div>
  );
}
