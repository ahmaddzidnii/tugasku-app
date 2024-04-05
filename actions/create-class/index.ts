"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateClass } from "./schema";
import { prisma } from "@/lib/prisma";

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
      error: "Missing fields. Failed to create board",
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
        bannerImageUrl: "https://i.ibb.co/y4FSKD2/img-code.jpg",
        description,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create board",
    };
  }

  revalidatePath(`/app`);
  return { data: newClass };
};

export const createClass = createSafeAction(CreateClass, handler);
