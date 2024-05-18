"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";

import { Button } from "@/components/ui/button";
export function SubNavAction({ id }: { id: string }) {
  const router = useRouter();
  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        title="Tambahkan Tugas"
        onClick={() => {
          router.push(`/u/c/${id}/assignments/create`, { scroll: false });
        }}
      >
        <Plus />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        title="Pengaturan"
      >
        <Link href={`/u/c/${id}/settings`}>
          <IoMdSettings className="w-6 h-6" />
        </Link>
      </Button>
    </>
  );
}
