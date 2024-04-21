"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import * as Sentry from "@sentry/nextjs";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { ArchiveClass } from "./schema";
import { prisma } from "@/lib/prisma";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { classId, isArchive } = data;

  if (!classId) {
    return {
      error: "Input tidak lengkap, gagal mengupdate kelas!",
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
      error: "Unauthorized",
    };
  }

  let newClass;

  try {
    newClass = await prisma?.class.update({
      where: {
        classId,
      },
      data: {
        isArchived: isArchive,
      },
    });
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    return {
      error: "gagal mengupdate kelas",
    };
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/u/c/${classId}`);
  return { data: newClass };
};

export const archiveClass = createSafeAction(ArchiveClass, handler);
