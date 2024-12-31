"use server";

import { productFormSchema } from "~/schema/product-form";
import { db } from "./db";
import {
  categories,
  productImages,
  products,
  productTags,
  subcategories,
  tags,
} from "./db/schema";
import { tagFormSchema } from "~/schema/tag-form";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import {
  categoryFormSchema,
  subcategoryFormSchema,
} from "~/schema/category-form";
import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";

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

export const onEditProductForm = async (
  productId: number,
  formData: FormData,
): Promise<FormState> => {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  const data = Object.fromEntries(formData);
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

  await db
    .update(products)
    .set({
      name: parsedData.data.name,
      price: parsedData.data.price,
      description: parsedData.data.description,
      subcategoryId: parsedData.data.subcategoryId,
    })
    .where(eq(products.id, productId));

  if (parsedData.data.tagIds) {
    await db.delete(productTags).where(eq(productTags.productId, productId));
    await db.insert(productTags).values(
      parsedData.data.tagIds.map((tagId) => ({
        productId: productId,
        tagId,
      })),
    );
  }

  return {
    message: "Success",
  };
};

export const deleteProductImage = async (
  imageId: number,
): Promise<FormState> => {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  const deletedImage = await db
    .delete(productImages)
    .where(eq(productImages.id, imageId))
    .returning();

  if (deletedImage.length === 0) {
    return {
      message: "Error",
    };
  }
  const utapi = new UTApi();
  await utapi.deleteFiles(
    deletedImage
      .map((image) => {
        const imageId = image.url.split("/").pop();
        if (!imageId) return "";
        return imageId;
      })
      .filter((imageId) => imageId),
  );

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

  await db.insert(tags).values({
    name: parsedData.data.name,
  });

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
};

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

  await db.insert(categories).values({
    name: parsedData.data.name,
    description: parsedData.data.description,
  });

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
};

export const onSubmitSubcategoryForm = async (
  formData: FormData,
): Promise<FormState> => {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  const data = Object.fromEntries(formData);
  console.log(data);
  const parsedData = subcategoryFormSchema.safeParse(data);

  console.log(parsedData);

  if (!parsedData.success) {
    return {
      message: "Error",
    };
  }

  await db.insert(subcategories).values({
    name: parsedData.data.name,
    description: parsedData.data.description,
    categoryId: parsedData.data.categoryId,
  });

  return {
    message: "Success",
  };
};

export const onEditSubcategoryForm = async (
  subcategoryId: number,
  formData: FormData,
): Promise<FormState> => {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  const data = Object.fromEntries(formData);
  console.log(data);
  const parsedData = subcategoryFormSchema.safeParse(data);

  console.log(parsedData);

  if (!parsedData.success) {
    return {
      message: "Error",
    };
  }

  await db
    .update(subcategories)
    .set({
      name: parsedData.data.name,
      description: parsedData.data.description,
    })
    .where(eq(subcategories.id, subcategoryId));

  return {
    message: "Success",
  };
};
