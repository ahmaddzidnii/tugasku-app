import { z } from "zod";
import { Assignment } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateAssignment } from "./schema";

export type InputType = z.infer<typeof CreateAssignment>;
export type ReturnType = ActionState<InputType, Assignment>;
