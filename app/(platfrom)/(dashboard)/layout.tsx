import { ModalProvider } from "@/providers/modal-provider";
import { NavbarDashboard } from "./_components/navbar-dashboard";
import { SidebarDashboard } from "./_components/sidebar-dashboard";
import { Suspense } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ModalProvider />
      <NavbarDashboard />
      <div className="">
        <Suspense fallback={null}>
          <SidebarDashboard />
        </Suspense>
        <div className="md:ps-72">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
