import { Hono } from "hono";
import { z } from "zod";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { prisma } from "@/lib/prisma";
import { validateOrderBy } from "@/common/validate-query";

import { CreateAssignment } from "@/app/api/schema/assignments/create";
import { UpdateAssignment } from "@/app/api/schema/assignments/update";

import { createResponse } from "@/common/create-response";
import { validatorMidleware } from "@/app/api/middleware/validator";

const app = new Hono();

/**
 *
 * GET /api/v2/assignments
 */
app.get(
  "/",
  validatorMidleware({
    target: "query",
    schema: z.object({ classId: z.string(), orderBy: z.string().optional() }),
  }),
  async (c) => {
    const startTime = performance.now();
    const { classId, orderBy } = c.req.valid("query");

    let orderByParsed: string[] = ["dueDate", "desc"];

    if (orderBy) {
      const { isValid, error, orderByParsed: parsed } = validateOrderBy(orderBy);
      if (parsed && isValid) {
        orderByParsed = parsed;
      } else {
        return c.json(
          createResponse({
            data: null,
            errors: [error],
            status: 400,
            took: performance.now() - startTime,
            type: "ValidationError",
          }),
          400
        );
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
        return c.json(
          createResponse({
            data: null,
            errors: ["Class not found"],
            status: 404,
            took: performance.now() - startTime,
            type: "NotFoundError",
          }),
          404
        );
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

      const formatedData = task.map((item) => {
        const { createdAt, updatedAt, ...rest } = item;
        return {
          ...rest,
          links: {
            self: `/assignments/${item.assignmentId}`,
            class: `/classes/${item.class.classId}`,
          },
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });

      return c.json(
        createResponse({
          data: formatedData,
          errors: null,
          status: 200,
          took: performance.now() - startTime,
        })
      );
    } catch (error) {
      console.log(error);
      return c.json(
        createResponse({
          data: null,
          errors: ["Internal Server Error"],
          status: 500,
          type: "ServerError",
          took: performance.now() - startTime,
        }),
        500
      );
    }
  }
);

/**
 *
 * GET /api/v2/assignments/:assignmentsId
 */
app.get("/:assignmentId", async (c) => {
  const startTime = performance.now();
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
      return c.json(
        createResponse({
          data: null,
          errors: ["Assignment not found!"],
          status: 404,
          took: performance.now() - startTime,
          type: "NotFoundError",
        }),
        404
      );
    }

    const { createdAt, updatedAt, ...rest } = assignment;

    const assignmentFormated = {
      ...rest,
      links: {
        class: `/classes/${assignment.class.classId}`,
      },
      createdAt: assignment.createdAt,
      updatedAt: assignment.updatedAt,
    };

    return c.json(
      createResponse({
        data: assignmentFormated,
        errors: null,
        status: 200,
        took: performance.now() - startTime,
      }),
      200
    );
  } catch (error) {
    console.log(error);
    return c.json(
      createResponse({
        data: null,
        errors: ["Internal Server Error"],
        status: 500,
        took: performance.now() - startTime,
        type: "ServerError",
      }),
      500
    );
  }
});

/**
 *
 * POST /api/v2/assignments
 */
app.post(
  "/",
  clerkMiddleware(),
  validatorMidleware({
    target: "json",
    schema: CreateAssignment,
  }),
  async (c) => {
    const startTime = performance.now();
    const { classId, taskTitle, taskDescription, dueDate } = c.req.valid("json");

    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        createResponse({
          data: null,
          errors: ["Unauthorized"],
          status: 401,
          took: performance.now() - startTime,
          type: "Unauthorized",
        }),
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
        return c.json(
          createResponse({
            data: null,
            errors: ["Class not found!"],
            status: 404,
            took: performance.now() - startTime,
            type: "NotFoundError",
          }),
          404
        );
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

      return c.json(
        createResponse({
          data: assignment,
          errors: null,
          status: 201,
          took: performance.now() - startTime,
        }),
        201
      );
    } catch (error) {
      console.log(error);
      return c.json(
        createResponse({
          data: null,
          errors: ["Internal Server Error"],
          status: 500,
          took: performance.now() - startTime,
          type: "ServerError",
        }),
        500
      );
    }
  }
);

/**
 * PATCH /api/v2/assignments:assignmentId
 * Update a Assignment
 */
app.patch(
  "/:assignmentId",
  validatorMidleware({
    schema: UpdateAssignment,
    target: "json",
  }),
  async (c) => {
    const startTime = performance.now();
    const assignmentId = c.req.param("assignmentId");

    const assignmentDTO = c.req.valid("json");

    if (!assignmentId) {
      return c.json(
        createResponse({
          data: null,
          errors: ["Assignment not found!"],
          status: 404,
          type: "NotFoundError",
          took: performance.now() - startTime,
        }),
        404
      );
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
        return c.json(
          createResponse({
            data: null,
            errors: ["Assignment not found!"],
            status: 404,
            type: "NotFoundError",
            took: performance.now() - startTime,
          }),
          404
        );
      }

      const assignment = await prisma.assignment.update({
        where: {
          assignmentId: existingAssignment.assignmentId,
        },
        data: {
          ...assignmentDTO,
        },
      });

      return c.json(
        createResponse({
          data: assignment,
          errors: null,
          status: 200,
          took: performance.now() - startTime,
        })
      );
    } catch (error) {
      console.log(error);
      return c.json(
        createResponse({
          data: null,
          errors: ["Internal Server Error"],
          status: 500,
          took: performance.now() - startTime,
          type: "Server Error",
        }),
        500
      );
    }
  }
);

/**
 * DELETE /api/v2/assignments:assignmentId
 * Update a Assignment
 */

app.delete("/:assignmentId", async (c) => {
  const startTime = performance.now();
  const assignmentId = c.req.param("assignmentId");
  if (!assignmentId) {
    return c.json(
      createResponse({
        data: null,
        errors: ["Assignment not found!"],
        status: 404,
        type: "NotFoundError",
        took: performance.now() - startTime,
      }),
      404
    );
  }

  try {
    const existingAssignment = await prisma.assignment.findUnique({
      where: {
        assignmentId,
      },
      select: {
        assignmentId: true,
      },
    });

    if (!existingAssignment) {
      return c.json(
        createResponse({
          data: null,
          errors: ["Assignment not found!"],
          status: 404,
          type: "NotFoundError",
          took: performance.now() - startTime,
        }),
        404
      );
    }
    await prisma.assignment.delete({
      where: {
        assignmentId: existingAssignment.assignmentId,
      },
    });

    return c.json(
      createResponse({
        data: {
          message: "Assignment deleted successfully",
        },
        errors: null,
        status: 200,
        took: performance.now() - startTime,
      }),
      200
    );
  } catch (error) {
    console.error(error);
    return c.json(
      createResponse({
        data: null,
        errors: ["Internal Server Error"],
        status: 500,
        took: performance.now() - startTime,
        type: "ServerError",
      }),
      500
    );
  }
});

export default app;
