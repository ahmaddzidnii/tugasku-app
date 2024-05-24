import { z } from "zod";

export const UpdateAssignment = z.object({
  asignmentTitle: z.string().optional(),
  asignmentDescription: z.string().optional(),
  dueDate: z.string().optional().nullable(),
  isCompleted: z.boolean().optional(),
});
