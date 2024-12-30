"use server";

import { productFormSchema } from "~/schema/product-form";
import { db } from "./db";
import { products, productTags } from "./db/schema";

export type FormState = {
  message: string;
};

export const onSubmitProductForm = async (
  //   prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  let data = Object.fromEntries(formData);
  console.log(data);
  if (data.tagIds) {
    data.tagIds = JSON.parse(data.tagIds);
  }
  const parsedData = productFormSchema.safeParse(data);

  console.log(parsedData);

  if (!parsedData.success) {
    return {
      message: "Error",
    };
  }

  const product = await db
    .insert(products)
    .values({
      name: parsedData.data.name,
      price: parsedData.data.price,
      description: parsedData.data.description,
      subcategoryId: parsedData.data.subcategoryId,
    })
    .returning();

  if (parsedData.data.tagIds) {
    await db.insert(productTags).values(
      parsedData.data.tagIds.map((tagId) => ({
        productId: product[0]!.id,
        tagId,
      })),
    );
  }

  return {
    message: "Success",
  };
};
