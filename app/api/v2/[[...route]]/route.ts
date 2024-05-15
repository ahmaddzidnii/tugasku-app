import { Hono } from "hono";
import { handle } from "hono/vercel";

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const runtime = "edge";

const app = new Hono().basePath("/api/v2");

app
  .get("/hello", (c) => {
    return c.json({
      message: "Hello Next.js!",
    });
  })
  .get(
    "/hello/:name",
    zValidator("param", z.object({ name: z.string() })),
    zValidator("query", z.object({ age: z.string().optional() })),
    (c) => {
      const { name } = c.req.valid("param");
      const { age } = c.req.valid("query");
      return c.json({
        message: `Hello ${name})}!`,
        age,
      });
    }
  );

export const GET = handle(app);
export const POST = handle(app);
