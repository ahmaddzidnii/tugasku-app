import { ClerkProvider } from "@clerk/nextjs";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <div className={roboto.className}>{children}</div>
    </ClerkProvider>
  );
};

export default PlatformLayout;
