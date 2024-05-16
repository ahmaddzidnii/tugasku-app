import { z } from "zod";
export const FormSchema = z.object({
  assignments_title: z
    .string({
      required_error: "A name is required.",
    })
    .min(1, {
      message: "A name is required.",
    }),
  class_name: z.string({
    required_error: "Please select a class.",
  }),
  dob: z.date().optional(),
});
