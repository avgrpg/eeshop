import { z } from "zod";

export const urlSchema = z.object({
    urlcategory: z.coerce.number().min(0),
    urlsubcategory: z.coerce.number().min(0),
})

export const urlCategorySchema = z.coerce.number().min(0);
export const urlSubcategorySchema = z.coerce.number().min(0);