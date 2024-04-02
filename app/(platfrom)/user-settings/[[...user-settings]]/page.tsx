"use client";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@clerk/nextjs";
import Link from "next/link";

const UserSettingsPage = () => {
  return (
    <div className="pt-16">
      <UserProfile />
      <Button
        className="w-full my-6"
        asChild
      >
        <Link href="/app">Back To Apps</Link>
      </Button>
    </div>
  );
};

export default UserSettingsPage;
