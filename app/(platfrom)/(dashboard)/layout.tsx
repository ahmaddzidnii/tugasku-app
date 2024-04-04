import { ModalProvider } from "@/providers/modal-provider";
import { NavbarDashboard } from "./_components/navbar-dashboard";
import { SidebarDashboard } from "./_components/sidebar-dashboard";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ModalProvider />
      <NavbarDashboard />
      <div className="">
        <SidebarDashboard />
        <div className="md:ps-72">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
