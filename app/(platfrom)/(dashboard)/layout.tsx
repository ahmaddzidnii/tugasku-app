import { NavbarDashboard } from "./_components/navbar-dashboard";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarDashboard />
      {children}
    </>
  );
};

export default DashboardLayout;
