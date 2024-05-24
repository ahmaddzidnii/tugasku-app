import { z } from "zod";

export const UpdateAssignment = z.object({
  assignmentId: z.string(),
  assignmentTitle: z.string().optional(),
  assignmentDescription: z.string().optional(),
  dueDate: z.string().optional().nullable(),
  isCompleted: z.boolean().optional(),
});
