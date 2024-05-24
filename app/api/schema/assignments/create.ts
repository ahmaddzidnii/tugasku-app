import { z } from "zod";

export const CreateAssignment = z.object({
  classId: z.string(),
  taskTitle: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name is required",
  }),
  taskDescription: z.string().optional(),
  dueDate: z.string().optional().nullable(),
});
