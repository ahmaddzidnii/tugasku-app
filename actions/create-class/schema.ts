import { z } from "zod";

export const CreateClass = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name is required",
  }),
  teacherName: z.string({
    required_error: "Teacher name is required",
    invalid_type_error: "Teacher name is required",
  }),
  description: z.string().optional(),
});
