import { db } from "~/server/db";

// const MockData = [
//   {
//     name: "AND MORE (1).jpg",
//     url: "https://utfs.io/f/wfaMRmIk7Dp8671ttiuX0F7nxDjHSzfYuo3aZlwAGyeTdVkm",
//   },
//   {
//     name: "AND MORE (2).jpg",
//     url: "https://utfs.io/f/wfaMRmIk7Dp86oNmgPvuX0F7nxDjHSzfYuo3aZlwAGyeTdVk",
//   },
//   {
//     name: "AND MORE.jpg",
//     url: "https://utfs.io/f/wfaMRmIk7Dp8gxXmGZWjKXCZ1Y6hkPtU7x9yJevnBd4FuSio",
//   },
// ];

export default async function HomePage() {
  const products = await db.query.products.findMany({
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
  return (
    <main className="">
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
