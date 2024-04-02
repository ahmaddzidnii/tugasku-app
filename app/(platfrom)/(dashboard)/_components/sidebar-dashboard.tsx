import { SidebarDesktop } from "./sidebar-dekstop";
import { SidebarMobile } from "./sidebar-mobile";

export const SidebarDashboard = () => {
  return (
    <>
      <SidebarMobile />
      <SidebarDesktop />
    </>
  );
};
