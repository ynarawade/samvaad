import z from "zod";

export function transformChannelName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^a-z0-9-]/g, "") // Keep only letters, numbers, and dashes
    .replace(/-+/g, "-") // Collapse multiple dashes into one
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing dashes
}

export const ChannelNameSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Channel name must be at least 3 characters long." })
    .max(30, { message: "Channel name must not exceed 30 characters." })
    .transform((name, context) => {
      const transformed = transformChannelName(name);
      if (transformed.length < 3) {
        context.addIssue({
          code: "custom",
          message:
            "Channel name must be at least 3 characters long after transformation.",
        });
        return z.NEVER;
      }
      return transformed;
    }),
});

export type ChannelNameSchemaType = z.infer<typeof ChannelNameSchema>;
