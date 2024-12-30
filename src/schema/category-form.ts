import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
});

export const subcategoryFormSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  categoryId: z.coerce.number().min(1),
});