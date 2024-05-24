import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { prisma } from "@/lib/prisma";
import { validateOrderBy } from "@/common/validate-query";

import { CreateAssignment } from "@/app/api/schema/assignments/create";
import { UpdateAssignment } from "@/app/api/schema/assignments/update";

const app = new Hono();

/**
 *
 * GET /api/v2/assignments
 */

app.get(
  "/",
  zValidator("query", z.object({ classId: z.string(), orderBy: z.string().optional() })),
  async (c) => {
    const { classId, orderBy } = c.req.valid("query");

    let orderByParsed: string[] = ["dueDate", "desc"];

    if (orderBy) {
      const { isValid, error, orderByParsed: parsed } = validateOrderBy(orderBy);
      if (parsed && isValid) {
        orderByParsed = parsed;
      } else {
        return c.json({ error }, 400);
      }
    }

    try {
      const existingClass = await prisma.class.findUnique({
        where: {
          classId,
        },
        select: {
          classId: true,
          name: true,
        },
      });

      if (!existingClass) {
        return c.json({ error: "Class not found!" }, 404);
      }

      const task = await prisma.assignment.findMany({
        where: {
          classId: existingClass.classId,
        },
        orderBy: {
          [orderByParsed[0]]: orderByParsed[1],
        },
        select: {
          assignmentId: true,
          assignmentTitle: true,
          assignmentDescription: true,
          dueDate: true,
          isCompleted: true,

          class: {
            select: {
              classId: true,
              name: true,
              teacherName: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      return c.json(task);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  }
);

/**
 *
 * GET /api/v2/assignments/:assignmentsId
 */

app.get("/:assignmentId", async (c) => {
  const assignmentId = c.req.param("assignmentId");
  try {
    const assignment = await prisma.assignment.findUnique({
      where: {
        assignmentId,
      },

      select: {
        assignmentId: true,
        assignmentTitle: true,
        assignmentDescription: true,
        dueDate: true,
        isCompleted: true,

        class: {
          select: {
            classId: true,
            name: true,
            teacherName: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!assignment) {
      return c.json({ error: "Assignment not found!" }, 404);
    }

    return c.json(assignment);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

/**
 *
 * POST /api/v2/assignments
 */

app.post("/", clerkMiddleware(), zValidator("json", CreateAssignment), async (c) => {
  const { classId, taskTitle, taskDescription, dueDate } = c.req.valid("json");

  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json(
      {
        error: "Unauthorized!",
      },
      401
    );
  }
  try {
    const exisingClass = await prisma.class.findUnique({
      where: {
        classId,
      },
      select: {
        classId: true,
      },
    });

    if (!exisingClass) {
      return c.json({ error: "Class not found!" }, 404);
    }

    const assignment = await prisma.assignment.create({
      data: {
        assignmentTitle: taskTitle,
        assignmentDescription: taskDescription,
        dueDate,
        class: {
          connect: {
            classId: exisingClass.classId,
          },
        },
      },
    });

    return c.json(assignment);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

/**
 * POST /api/v2/assignments:assignmentId
 * Update a Assignment
 */

app.post("/:assignmentId", zValidator("json", UpdateAssignment), async (c) => {
  const assignmentId = c.req.param("assignmentId");

  const assignmentDTO = c.req.valid("json");

  if (!assignmentId) {
    return c.json({ error: "Assignment not found!" }, 404);
  }
  try {
    const existingAssignment = await prisma.assignment.findUnique({
      where: {
        assignmentId: assignmentId,
      },
      select: {
        assignmentId: true,
      },
    });

    if (!existingAssignment) {
      return c.json({ error: "Assignment not found!" }, 404);
    }

    const assignment = await prisma.assignment.update({
      where: {
        assignmentId: existingAssignment.assignmentId,
      },
      data: {
        ...assignmentDTO,
      },
    });

    return c.json(assignment);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

/**
 * DELETE /api/v2/assignments:assignmentId
 * Update a Assignment
 */

app.delete("/:assignmentId", async (c) => {});

export default app;
