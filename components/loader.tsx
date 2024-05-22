import Image from "next/image";

export const Loader = () => {
  return (
    <Image
      src="/logo.svg"
      width={60}
      height={60}
      className="animate-pulse"
      alt="loader"
    />
  );
};
