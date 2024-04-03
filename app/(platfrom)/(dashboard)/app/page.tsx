import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export async function generateMetadata() {
  const user = await currentUser();
  return {
    title: `${user?.username} - Dashboard`,
    description: "Dashboard",
  };
}

const PlatformMainPage = async () => {
  return <div className="pt-16 px-5 text-justify"></div>;
};

export default PlatformMainPage;
