import { Hono } from "hono";
import { handle } from "hono/vercel";

import classes from "./classes";
import assignments from "./assignments";

export const runtime = "nodejs";

const app = new Hono().basePath("/api/v2");

app.route("/classes", classes);

app.route("/assignments", assignments);

export const GET = handle(app);
export const POST = handle(app);
