import { Hono } from "hono";
import { handle } from "hono/vercel";

import classes from "./classes";
export const runtime = "nodejs";

const app = new Hono().basePath("/api/v2");

app.route("/classes", classes);

export const GET = handle(app);
export const POST = handle(app);
