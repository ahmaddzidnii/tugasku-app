"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";

export function SubNavAction({ id }: { id: string }) {
  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        title="Tambahkan Tugas"
        onClick={() => {
          console.log("Buyerkan Tugas");
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
