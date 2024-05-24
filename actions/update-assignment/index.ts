"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import axios from "axios";
import { Assignment } from "@prisma/client";

import { UpdateAssignment } from "./schema";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { assignmentId, assignmentTitle, assignmentDescription, dueDate, isCompleted } = data;

  const { getToken } = auth();

  if (!assignmentId) {
    return {
      error: "Input tidak lengkap, gagal menambahkan kelas!",
    };
  }

  let newAssignment;

  try {
    const { data } = await axios.post<Assignment>(
      `${process.env.WEB_DOMAIN}/api/v2/assignments/${assignmentId}`,
      {
        assignmentTitle,
        assignmentDescription,
        dueDate,
        isCompleted,
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

  revalidatePath(`/u/c/${newAssignment.classId}/assignment/${assignmentId}`);
  return { data: newAssignment };
};

export const updateAssignment = createSafeAction(UpdateAssignment, handler);
