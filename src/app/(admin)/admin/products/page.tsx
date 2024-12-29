import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import { deleteProduct, getProductsWithImagesnTags } from "~/server/queries";

import type { ProductWithImagesAndTags } from "~/server/queries";

type ProductWithImagesAndTag = ProductWithImagesAndTags[number];

const ProductDeleteButton = ({ productId }: { productId: number }) => {
  return (
    <div className="absolute top-2 right-2">
      <form
        action={async () => {
          "use server";
          await deleteProduct(productId);
        }}
      >
        <button
          className="rounded-full h-6 w-6 flex items-center justify-center bg-destructive text-destructive-foreground hover:bg-destructive/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Trash2 size={16} />
          </button>
      </form>
    </div>
  )
}

const ProductCard = ({ product }: { product: ProductWithImagesAndTag }) => {
  return (
    <div className="h-56 overflow-hidden rounded-lg bg-background shadow-lg transition hover:shadow-xl duration-300">
      <div className="bg-primary/20 h-40 overflow-hidden relative">
        {product.images[0]?.url && (
          <Image
            src={product.images[0].url}
            alt={product.images[0].url}
            // width={200}
            // height={160}
            fill
            objectFit="cover"
          />
        )}
        <ProductDeleteButton productId={product.id} />
      </div>
      <div className="flex flex-col px-2 py-1">
        <h1 className="text-lg font-bold truncate">{product.name}</h1>
        <div className="flex flex-row justify-between gap-2">
          <p className="text-xl font-medium text-primary">
            <span className="text-xs">$ </span>
            {product.price}
          </p>
          <div className="flex flex-row gap-2">
            {product.tags.length > 0 && (
              <div className="flex flex-row items-center gap-1 font-medium">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag?.id}
                    className="py-px text-xs"
                    variant="destructive"
                  >
                    {tag?.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function ProductsPage() {
  const products = await getProductsWithImagesnTags();
  console.log(products);

  return (
    <div className="flex flex-1 flex-col gap-2 p-2">
      <div className="p-2 text-2xl">
        <h1>Products</h1>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2 rounded-lg bg-muted/70 p-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
