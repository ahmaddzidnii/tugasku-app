import { z } from "zod";
import { Class } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { ArchiveClass } from "./schema";

export type InputType = z.infer<typeof ArchiveClass>;
export type ReturnType = ActionState<InputType, Class>;
