"use server";

import { productFormSchema } from "~/schema/product-form";
import { db } from "./db";
import { categories, products, productTags, tags } from "./db/schema";
import { tagFormSchema } from "~/schema/tag-form";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { categoryFormSchema } from "~/schema/category-form";

export type FormState = {
  message: string;
};

export const onSubmitProductForm = async (
  //   prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

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

export const onSubmitTagForm = async (
  formData: FormData,
): Promise<FormState> => {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  const data = Object.fromEntries(formData);
  console.log(data);
  const parsedData = tagFormSchema.safeParse(data);

  console.log(parsedData);

  if (!parsedData.success) {
    return {
      message: "Error",
    };
  }

  await db
    .insert(tags)
    .values({
      name: parsedData.data.name,
    })
  
  return {
    message: "Success",
  };
};

export const onEditTagForm = async (
  tagId: number,
  formData: FormData,
): Promise<FormState> => {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");
  
  const data = Object.fromEntries(formData);
  console.log(data);
  const parsedData = tagFormSchema.safeParse(data);

  console.log(parsedData);

  if (!parsedData.success) {
    return {
      message: "Error",
    };
  }

  await db
    .update(tags)
    .set({
      name: parsedData.data.name,
    })
    .where(eq(tags.id, tagId));

  return {
    message: "Success",
  };
}

export const onSubmitCategoryForm = async (
  formData: FormData,
): Promise<FormState> => {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  const data = Object.fromEntries(formData);
  console.log(data);
  const parsedData = categoryFormSchema.safeParse(data);

  console.log(parsedData);

  if (!parsedData.success) {
    return {
      message: "Error",
    };
  }

  await db
    .insert(categories)
    .values({
      name: parsedData.data.name,
      description: parsedData.data.description,
    })
  
  return {
    message: "Success",
  };
};

export const onEditCategoryForm = async (
  categoryId: number,
  formData: FormData,
): Promise<FormState> => {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  const data = Object.fromEntries(formData);
  console.log(data);
  const parsedData = categoryFormSchema.safeParse(data);

  console.log(parsedData);

  if (!parsedData.success) {
    return {
      message: "Error",
    };
  }

  await db
    .update(categories)
    .set({
      name: parsedData.data.name,
      description: parsedData.data.description,
    })
    .where(eq(categories.id, categoryId));

  return {
    message: "Success",
  };
}
