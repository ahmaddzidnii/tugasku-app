import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const classId = req.nextUrl.searchParams.get("classId") as string;
  const assignments = await prisma.task.findMany({
    where: {
      class: {
        classId: classId,
      },
    },
  });
  const currentEpoch = new Date().getTime();

  return Response.json(
    assignments.map((item) => {
      const dueDateEpoch = parseInt(item.dueDate!!);
      return {
        taskId: item.taskId,
        taskTitle: item.taskTitle,
        taskDescription: item.taskDescription,
        due: {
          dueDate: item.dueDate,
          isOverdue: dueDateEpoch < currentEpoch,
          dueToday: new Date(dueDateEpoch).toDateString() === new Date(currentEpoch).toDateString(),
          dueThisWeek: dueDateEpoch < currentEpoch + 7 * 24 * 60 * 60 * 1000, // Minggu ini
        },
      };
    })
  );
}
export async function POST(req: Request) {
  const { classId, taskTitle, taskDescription, dueDate } = await req.json();

  // TODO: Implement actual logic
  const assignments = await prisma.task.create({
    data: {
      taskTitle,
      taskDescription,
      dueDate,
      class: {
        connect: {
          classId,
        },
      },
    },
  });
  return Response.json(assignments);
}
