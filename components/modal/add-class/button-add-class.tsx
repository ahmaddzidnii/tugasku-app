"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

interface ButtonAddClassProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "sm" | "lg" | "icon" | "default";
}

export const ButtonAddClass = ({
  variant = "default",
  size = "sm",
}: ButtonAddClassProps) => {
  const modal = useModal();

  const handleClick = () => {
    modal.onOpen("ADD_CLASS");
  };

  return (
    <Button
      size={size}
      title="Buat kelas"
      variant={variant}
      onClick={handleClick}
    >
      <Plus className="w-5 h-5 sm:mr-2" />
      <span className="hidden sm:block ">Tambah kelas</span>
    </Button>
  );
};
