import { Poppins } from "next/font/google";
import { NavbarMarketing } from "./_components/navbar-marketing";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      style={{ fontFamily: poppins.style.fontFamily }}
      className="px-2 marketing-page w-full min-h-screen "
    >
      <NavbarMarketing />
      <div className="md:container">{children}</div>
    </main>
  );
};

export default MarketingLayout;
