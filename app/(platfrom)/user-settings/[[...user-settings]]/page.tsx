"use client";
import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, UserProfile } from "@clerk/nextjs";
import Link from "next/link";

const UserSettingsPage = () => {
  return (
    <div className="">
      <ClerkLoading>loading..</ClerkLoading>
      <ClerkLoaded>
        <UserProfile
          appearance={{
            elements: {
              rootBox: {
                boxShadow: "none",
                width: "100%",
              },
            },
          }}
        />
        <Button
          className="w-full my-6"
          asChild
        >
          <Link href="/app">Back To Apps</Link>
        </Button>
      </ClerkLoaded>
    </div>
  );
};

export default UserSettingsPage;
