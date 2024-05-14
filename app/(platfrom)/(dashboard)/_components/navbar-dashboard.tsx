import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

import { Skeleton } from "@/components/ui/skeleton";
import { ToogleNavbar } from "./toogle-navbar";
import { ButtonAddClass } from "@/components/modal/add-class/button-add-class";

export const NavbarDashboard = () => {
  return (
    <header className="px-5 h-14 fixed z-50 bg-background top-0 border-b-2 border-muted w-full flex justify-between items-center">
      <div>
        <ToogleNavbar />
        <ButtonAddClass />
      </div>
      <ClerkLoading>
        <div className="flex">
          <Skeleton className="h-8 w-8 aspect-square rounded-full bg-secondary" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton afterSignOutUrl="/login" />
      </ClerkLoaded>
    </header>
  );
};
