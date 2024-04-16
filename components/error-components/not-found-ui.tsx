import notFoundSvg from "@/public/svg/404.svg";
export const NotFoundUI = () => {
  return (
    <div className="flex h-full w-full items-center justify-center flex-col">
      <img
        src={notFoundSvg.src}
        alt="not-found"
        className="w-[400px] h-[400px]"
      />
      <h1 className="text-base md:text-2xl lg:text-3xl font-bold">Not Found!</h1>
    </div>
  );
};
