import Link from "next/link";
import { db } from "~/server/db";

export default async function HomePage() {
  const products = await db.query.products.findMany({
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
  const categories = await db.query.categories.findMany();
  const subcategories = await db.query.subcategories.findMany();
  console.log(categories, subcategories);
  return (
    <main className="">
      <Link href="/admin">Admin</Link>
      <div className="flex flex-wrap gap-2">
        {products.map((product) => (
          <div className="w-80 border p-2" key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.subcategoryId}</p>
            <p>{product.tags.map((tag) => tag).join(", ")}</p>
            <div className="flex flex-wrap gap-2">
              {product.images.map((image) => (
                <div className="w-20 h-20 border" key={image}>
                  <img src={image} alt={image} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
