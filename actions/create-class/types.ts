import { z } from "zod";
import { Class } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateClass } from "./schema";

export type InputType = z.infer<typeof CreateClass>;
export type ReturnType = ActionState<InputType, Class>;
