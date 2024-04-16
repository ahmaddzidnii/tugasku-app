import { axiosInstance } from "@/lib/axios";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Class } from "@prisma/client";

interface Response {
  status: number;
  message: string;
  data: Class[];
}
export async function getAllClass() {
  const { data } = await axiosInstance.get<Response>(`${process.env.WEB_DOMAIN}/api/v1/classes`, {
    params: {
      userId: auth().userId as string,
    },
  });

  return data.data;
}
export async function getClassById(classId: string) {
  const data = await prisma.class.findUnique({
    where: {
      classId: classId,
    },
  });
  return data;
}
