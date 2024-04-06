import { getAllClass } from "@/service/get-all-class";
import { SidebarDesktop } from "./sidebar-dekstop";
import { SidebarMobile } from "./sidebar-mobile";

export const SidebarDashboard = async () => {
  const classes = await getAllClass();

  return (
    <>
      <SidebarMobile data={classes} />
      <SidebarDesktop data={classes} />
    </>
  );
};
