import "server-only";
import { db } from "./db";
import { cache } from "react";

export const getProductsWithImagesnTags = cache(async () => {
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
