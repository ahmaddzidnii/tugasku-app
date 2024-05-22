"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import axios from "axios";
import { Assignment } from "@prisma/client";

import { CreateAssignment } from "./schema";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { taskTitle, classId, taskDescription, dueDate } = data;

  const { getToken } = auth();

  if (!taskTitle || !classId) {
    return {
      error: "Input tidak lengkap, gagal menambahkan kelas!",
    };
  }

  let newAssignment;

  try {
    const { data } = await axios.post<Assignment>(
      `${process.env.WEB_DOMAIN}/api/v2/assignments`,
      {
        classId,
        taskTitle,
        taskDescription,
        dueDate,
      },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );

    newAssignment = data;
  } catch (error: any) {
    console.log(error?.response?.data);
    return {
      error: error?.response?.data?.error,
    };
  }

  revalidatePath(`/u/c/${classId}/assignment`);
  return { data: newAssignment };
};

export const createAssignment = createSafeAction(CreateAssignment, handler);
