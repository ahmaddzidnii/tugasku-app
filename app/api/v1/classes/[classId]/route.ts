import { ApiResponse } from "@/app/api/_response/response-success";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: { classId: string } }) {
  try {
    const classById = await prisma.class.findUnique({
      where: {
        classId: params.classId,
      },
    });
    return Response.json(new ApiResponse(200, "Success", classById));
  } catch (error) {
    console.log(error);
  }
}
