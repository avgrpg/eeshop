import Image from "next/image";
import Link from "next/link";
import { getProductCategories, getProductsWithImagesnTags } from "~/server/queries";

export default async function HomePage() {
  const productsWithImagesAndTags = await getProductsWithImagesnTags();

  const {categories, subcategories} = await getProductCategories();
  
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
