import "server-only";
import { db } from "./db";
import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { productImages, products, productTags } from "./db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";

export const getProductsWithImagesnTags = cache(async () => {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  //   const products = await db.query.products.findMany();
  //   const productsWithImages = await db.query.productImages.findMany();
  //   const productsWithTags = await db.query.productTags.findMany();
  //   const tags = await db.query.tags.findMany();

  const productsData = db.query.products.findMany();
  const productImagesData = db.query.productImages.findMany();
  const productTagsData = db.query.productTags.findMany();
  const tagsData = db.query.tags.findMany();

  const [products, productsWithImages, productsWithTags, tags] =
    await Promise.all([
      productsData,
      productImagesData,
      productTagsData,
      tagsData,
    ]);

  console.log("get ProductsWithImagesnTags");

  const productsWithImagesAndTags = products.map((product) => {
    return {
      ...product,
      images: productsWithImages.filter(
        (image) => image.productId === product.id,
      ),
      tags: productsWithTags
        .filter((tag) => tag.productId === product.id)
        .map((tag) => tags.find((t) => t.id === tag.tagId)),
    };
  });
  return productsWithImagesAndTags;
});

export type ProductWithImagesAndTags = Awaited<
  ReturnType<typeof getProductsWithImagesnTags>
>;

export const deleteProduct = async (productId: number) => {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  const deletedProductImages = await db
    .delete(productImages)
    .where(eq(productImages.productId, productId))
    .returning();
  await db.delete(productTags).where(eq(productTags.productId, productId));
  await db.delete(products).where(eq(products.id, productId));

  if (deletedProductImages.length === 0) {
    redirect("/admin/products");
  }
  const utapi = new UTApi();
  await utapi.deleteFiles(
    deletedProductImages
      .map((image) => {
        const imageId = image.url.split("/").pop();
        if (!imageId) return "";
        return imageId;
      })
      .filter((imageId) => imageId),
  );

  redirect("/admin/products");
};

export const getProductCategories = cache(async () => {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  console.log("getProductCategories");

  const categories = await db.query.categories.findMany();
  const subcategories = await db.query.subcategories.findMany();

  return {
    categories,
    subcategories: subcategories.map((subcategory) => {
      return {
        ...subcategory,
        category: categories.find((category) => category.id === subcategory.categoryId),
      };
    }),
  };
});

export type Category = Awaited<ReturnType<typeof getProductCategories>>["categories"][number];
export type Subcategory = Awaited<ReturnType<typeof getProductCategories>>["subcategories"][number];

export const getProductTags = cache(async () => {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  console.log("getProductTags");

  const tagsData = db.query.tags.findMany();

  return tagsData;
});

export type Tag = Awaited<ReturnType<typeof getProductTags>>[number];