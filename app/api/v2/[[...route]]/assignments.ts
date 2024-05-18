import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { prisma } from "@/lib/prisma";

const app = new Hono();

app.get("/", async (c) => {
  return c.json({ success: true });
});

app.get("/:assignmentsId", async (c) => {
  const assignmentsId = c.req.param("assignmentsId");
  return c.json({ success: true, assignmentsId });
});

app.post(
  "/",
  zValidator(
    "json",
    z.object({
      classId: z.string(),
      title: z.string(),
      description: z.string(),
      dueDate: z.string().optional(),
    })
  ),
  async (c) => {
    const { classId, title, description, dueDate } = c.req.valid("json");

    try {
      await prisma.task.create({
        data: {
          taskTitle: title,
          taskDescription: description,
          dueDate,
          class: {
            connect: {
              classId,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  }
);
export default app;
