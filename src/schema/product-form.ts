import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(2),
  price: z.coerce.number().min(1),
  description: z.string().min(2),
  subcategoryId: z.coerce.number().min(1),
});
