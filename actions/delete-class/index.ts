"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteClass } from "./schema";
import { prisma } from "@/lib/prisma";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;

  if (!id) {
    return {
      error: "Input tidak lengkap, gagal menghapus kelas!",
    };
  }

  const user = await prisma?.user.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return {
      error: "Tindakan tidak diperbolehkan!",
    };
  }
  let result;
  try {
    result = await prisma?.class.delete({
      where: {
        classId: id,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "gagal menghapus kelas",
    };
  }

  revalidatePath(`/u/c/${id}`);
  return {
    data: result,
  };
};

export const deleteClass = createSafeAction(DeleteClass, handler);
