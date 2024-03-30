import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";

export const NavbarDashboard = () => {
  return (
    <header className="px-6 h-14 fixed top-0 border-b-2 border-muted w-full flex justify-between items-center">
      <div>
        <Button size="sm">
          <Plus className="w-5 h-5 mr-2" /> New class
        </Button>
      </div>
      <ClerkLoading>
        <div className="flex">
          <Skeleton className="h-8 w-16 aspect-video rounded-sm me-2" />
          <Skeleton className="h-8 w-8 aspect-square rounded-full" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton
          showName
          userProfileMode="modal"
          afterSignOutUrl="/login"
        />
      </ClerkLoaded>
    </header>
  );
};
