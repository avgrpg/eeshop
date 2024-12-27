import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import { getProductsWithImagesnTags } from "~/server/queries";

export default async function HomePage() {
  // const products = await db.query.products.findMany()
  // const productsWithImages = await db.query.productImages.findMany()
  // const productsWithTags = await db.query.productTags.findMany()
  // const tags = await db.query.tags.findMany()

  // const productsWithImagesAndTags = products.map((product) => {
  //   return {
  //     ...product,
  //     images: productsWithImages.filter((image) => image.productId === product.id),
  //     tags: productsWithTags.filter((tag) => tag.productId === product.id).map((tag) => tags.find((t) => t.id === tag.tagId))
  //   }
  // })
  // console.log("productsWithImagesAndTags", productsWithImagesAndTags)

  const productsWithImagesAndTags = await getProductsWithImagesnTags();

  const categories = await db.query.categories.findMany();
  const subcategories = await db.query.subcategories.findMany();
  console.log(categories, subcategories);
  return (
    <main className="">
      <Link href="/admin">Admin</Link>
      <div className="flex flex-wrap gap-2">
        {productsWithImagesAndTags.map((product) => (
          <div className="w-80 border p-2" key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.subcategoryId}</p>
            <p>{product.tags.map((tag) => tag?.name).join(", ")}</p>
            <div className="flex flex-wrap gap-2">
              {product.images.map((image) => (
                <div className="h-20 w-20 border" key={image.id}>
                  <Image
                    src={image.url}
                    alt={image.url}
                    style={{
                      objectFit: "contain",
                    }}
                    width={80}
                    height={80}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
