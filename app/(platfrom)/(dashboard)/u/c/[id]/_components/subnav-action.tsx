"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { Plus } from "lucide-react";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";

export function SubNavAction({ id }: { id: string }) {
  const modal = useModal();

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        title="Tambahkan Tugas"
        onClick={() => {
          modal.onOpen("ADD_ASSIGNMENT");
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
