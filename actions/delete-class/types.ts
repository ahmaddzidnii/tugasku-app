import { z } from "zod";
import { Class } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteClass } from "./schema";

export type InputType = z.infer<typeof DeleteClass>;
export type ReturnType = ActionState<InputType, Class>;
