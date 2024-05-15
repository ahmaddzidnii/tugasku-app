import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { prisma } from "@/lib/prisma";

const app = new Hono();

app.use("*", clerkMiddleware());
app.get(
  "/",
  zValidator(
    "query",
    z.object({
      userId: z.string({
        required_error: "userId is required",
      }),
    })
  ),
  async (c) => {
    const { userId } = c.req.valid("query");
    const auth = getAuth(c);

    // Memeriksa apakah pengguna telah terotentikasi
    if (!auth?.userId) {
      return c.json(
        {
          error: "Unauthorized",
        },
        401
      );
    }

    // Memeriksa apakah userId dari query sama dengan userId yang terotentikasi
    if (auth.userId !== userId) {
      return c.json({ error: "Forbidden" }, 403);
    }

    try {
      const classes = await prisma.class.findMany({
        where: {
          user: {
            userId: userId,
          },
        },
      });
      return c.json({
        success: true,
        request: {
          userId,
        },
        data: classes,
      });
    } catch (error) {
      console.log(error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  }
);

// Mendefinisikan rute GET untuk endpoint dengan parameter `/:id`
app.get("/:classId", zValidator("param", z.object({ classId: z.string() })), async (c) => {
  const { classId } = c.req.valid("param");

  const auth = getAuth(c);
  // Memeriksa apakah pengguna telah terotentikasi
  if (!auth?.userId) {
    return c.json(
      {
        error: "Unauthorized",
      },
      401
    );
  }
  try {
    const data = await prisma.class.findUnique({
      where: {
        classId: classId,
      },
    });
    return c.json({
      success: true,
      request: {
        classId,
      },
      data: data,
    });
  } catch (error) {
    console.log(error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

// Mendefinisikan rute POST untuk endpoint root `/`
// app.post("/", (c) => c.json("create a book", 201));

export default app;
