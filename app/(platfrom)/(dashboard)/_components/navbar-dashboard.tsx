import { Plus } from "lucide-react";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ToogleNavbar } from "./toogle-navbar";

export const NavbarDashboard = () => {
  return (
    <header className="px-5 h-14 fixed z-50 bg-background top-0 border-b-2 border-muted w-full flex justify-between items-center">
      <div>
        <ToogleNavbar />
        <Button
          size="sm"
          title="Buat kelas"
        >
          <Plus className="w-5 h-5 sm:mr-2" />
          <span className="hidden sm:block ">Tambah kelas</span>
        </Button>
      </div>
      <ClerkLoading>
        <div className="flex">
          <Skeleton className="h-8 w-8 aspect-square rounded-full bg-secondary" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton
          userProfileMode="navigation"
          userProfileUrl="/user-settings"
          afterSignOutUrl="/login"
        />
      </ClerkLoaded>
    </header>
  );
};
