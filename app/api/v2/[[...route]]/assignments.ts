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
export default app;
