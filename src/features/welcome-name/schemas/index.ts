import { z } from "zod";

export const welcomeNameSchema = z.object({
  name: z.string().min(1, "Name is required").max(100).trim(),
});

export type WelcomeNameInput = z.infer<typeof welcomeNameSchema>;
