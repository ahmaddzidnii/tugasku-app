"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import * as Sentry from "@sentry/nextjs";

import { CreateClass } from "./schema";
import { prisma } from "@/lib/prisma";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { name, teacherName, description } = data;

  if (!name || !teacherName) {
    return {
      error: "Input tidak lengkap, gagal menambahkan kelas!",
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
    newClass = await prisma?.class.create({
      data: {
        userId: user.id,
        name,
        teacherName,
        bannerImageUrl:
          "https://firebasestorage.googleapis.com/v0/b/apptugas-4da52.appspot.com/o/images%2Fthemes%2Fimg_code.jpg?alt=media&token=e0f8394f-004e-4567-a2f9-6cb3698a9e09",
        description,
      },
    });
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    return {
      error: "gagal menambahkan kelas",
    };
  }

  revalidatePath(`/u`);
  return { data: newClass };
};

export const createClass = createSafeAction(CreateClass, handler);
