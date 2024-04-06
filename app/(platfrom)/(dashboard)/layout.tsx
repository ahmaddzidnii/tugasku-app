import { ModalProvider } from "@/providers/modal-provider";
import { NavbarDashboard } from "./_components/navbar-dashboard";
import { SidebarDashboard } from "./_components/sidebar-dashboard";
import { Suspense } from "react";
import { Spinner } from "@/components/spinner";

const SidebarFallback = () => {
  return (
    <div className="h-full z-40  hidden fixed left-0 w-72 border-e-2 border-muted md:flex justify-center items-center ">
      <Spinner className="animate-spin fill-primary w-10 h-10" />
    </div>
  );
};
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ModalProvider />
      <NavbarDashboard />
      <div className="">
        <Suspense fallback={<SidebarFallback />}>
          <SidebarDashboard />
        </Suspense>

        <div className="md:ps-72 mt-14">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
