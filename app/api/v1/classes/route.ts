import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { ApiResponse } from "../../_response/response-success";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") as string;

  if (!userId) {
    return Response.json(
      { error: "Missing userId" },
      {
        status: 400,
      }
    );
  }
  const classes = await prisma.class.findMany({
    where: {
      user: {
        userId: userId,
      },
    },
  });

  return Response.json(new ApiResponse(200, "Success", classes));
}
