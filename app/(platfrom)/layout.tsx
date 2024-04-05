import { ClerkProvider } from "@clerk/nextjs";
import { Roboto } from "next/font/google";
import { TanstackProvider } from "@/providers/tanstack-provider";
import { CloseSidebarMobile } from "@/providers/close-sidebar-mobile";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TanstackProvider>
      <ClerkProvider>
        <CloseSidebarMobile />
        <div className={roboto.className}>{children}</div>
      </ClerkProvider>
    </TanstackProvider>
  );
};

export default PlatformLayout;
