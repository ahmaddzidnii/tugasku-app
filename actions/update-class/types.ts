import { z } from "zod";
import { Class } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateClass } from "./schema";

export type InputType = z.infer<typeof UpdateClass>;
export type ReturnType = ActionState<InputType, Class>;
