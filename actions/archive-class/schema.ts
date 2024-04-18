import { z } from "zod";

export const ArchiveClass = z.object({
  classId: z.string(),
  isArchive: z.boolean(),
});
