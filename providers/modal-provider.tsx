"use client";

import { ModalAddAssignment } from "@/components/modal/add-assignment";
import { ModalAddClass } from "@/components/modal/add-class";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ModalAddClass />
      <ModalAddAssignment />
    </>
  );
};
