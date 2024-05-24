import { z } from "zod";
import { Assignment } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateAssignment } from "./schema";

export type InputType = z.infer<typeof UpdateAssignment>;
export type ReturnType = ActionState<InputType, Assignment>;
