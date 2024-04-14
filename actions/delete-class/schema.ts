import { string, z } from "zod";

export const DeleteClass = z.object({
  id: string(),
});
