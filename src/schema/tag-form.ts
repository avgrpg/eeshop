import { z } from "zod";

export const tagFormSchema = z.object({
  name: z.string().min(2),
});
