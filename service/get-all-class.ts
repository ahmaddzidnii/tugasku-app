import { axiosInstance } from "@/lib/axios";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import { Class } from "@prisma/client";

interface Response {
  data: Class[];
}
export async function getAllClass() {
  const { data } = await axiosInstance.get<Response>(`${process.env.WEB_DOMAIN}/api/v2/classes`, {
    params: {
      userId: auth().userId as string,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await auth().getToken()}`,
    },
    withCredentials: true,
  });

  return data.data;
}
export async function getClassById(classId: string) {
  // const data = await prisma.class.findUnique({
  //   where: {
  //     classId: classId,
  //   },
  // });
  try {
    const { data } = await axiosInstance.get<{ data: Class }>(
      `${process.env.WEB_DOMAIN}/api/v2/classes/${classId}`,
      {
        params: {
          userId: auth().userId as string,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await auth().getToken()}`,
        },
        withCredentials: true,
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
