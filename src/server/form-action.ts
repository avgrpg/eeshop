"use server";

import { redirect } from "next/navigation";
import { productFormSchema } from "~/schema/product-form";
import { db } from "./db";
import { products } from "./db/schema";

export type FormState = {
  message: string;
};

export const onSubmitProductForm = async (
//   prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const data = Object.fromEntries(formData);
  console.log(data);
  const parsedData = productFormSchema.safeParse(data);

  console.log(parsedData);

  if (!parsedData.success) {
    return {
      message: "Error",
    };
  }

  await db.insert(products).values({
    name: parsedData.data.name,
    price: parsedData.data.price,
    description: parsedData.data.description,    
    subcategoryId: parsedData.data.subcategoryId,
  });

  return {
    message: "Success",
  }
};
