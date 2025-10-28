import { z } from "zod";

export const WorkspaceSchema = z.object({
  name: z.string().min(2, "Name is required").max(50),
});
