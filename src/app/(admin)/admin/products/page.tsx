import { Trash2 } from "lucide-react";
import Image from "next/image";
import { AddProductDialog } from "~/components/product-form";
import { Badge } from "~/components/ui/badge";
import { deleteProduct, getProductCategories, getProductsWithImagesnTags } from "~/server/queries";

import type { ProductWithImagesAndTags } from "~/server/queries";

type ProductWithImagesAndTag = ProductWithImagesAndTags[number];

const ProductDeleteButton = ({ productId }: { productId: number }) => {
  return (
    <div className="absolute right-2 top-2">
      <form
        action={async () => {
          "use server";
          await deleteProduct(productId);
        }}
      >
        <button className="hidden h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground transition-colors duration-200 hover:bg-destructive/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-hover:flex">
          <Trash2 size={16} />
        </button>
      </form>
    </div>
  );
};

const ProductCard = ({ product }: { product: ProductWithImagesAndTag }) => {
  return (
    <div className="group relative h-56 overflow-hidden rounded-lg bg-background shadow-lg transition duration-300 hover:shadow-xl">
      <div className="relative h-40 overflow-hidden bg-primary/20">
        {product.images[0]?.url && (
          <Image
            src={product.images[0].url}
            alt={product.images[0].url}
            // width={200}
            // height={160}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          />
        )}
      </div>
      <div className="flex flex-col px-2 py-1">
        <h1 className="truncate text-lg font-bold">{product.name}</h1>
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
      <ProductDeleteButton productId={product.id} />
    </div>
  );
};

const ProductAddButton = async () => {
  const { subcategories } = await getProductCategories();
  return (
    <AddProductDialog subcategories={subcategories} />
    // <Dialog>
    //   <DialogTrigger asChild>
    //     <Button variant="outline" className="flex items-center gap-2">
    //       <span>Add Product</span>
    //       <Plus size={16} />
    //     </Button>
    //   </DialogTrigger>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>
    //         Product Details
    //       </DialogTitle>
    //       <DialogDescription>
    //         * Required fields are marked with an asterisk
    //       </DialogDescription>
    //     </DialogHeader>
    //     <ProductForm subcategories={subcategories} />
    //   </DialogContent>
    // </Dialog>
  );
};

export default async function ProductsPage() {
  // const products = await getProductsWithImagesnTags();
  // console.log(products);
  // const { categories, subcategories } = await getProductCategories();
  // console.log(categories, subcategories);

  const [products, { categories, subcategories }] = await Promise.all([
    getProductsWithImagesnTags(),
    getProductCategories(),
  ]);
  console.log("products", products);
  console.log("categories", categories);
  console.log("subcategories", subcategories);

  return (
    <div className="flex flex-1 flex-col gap-2 p-2">
      <div className="p-2 text-2xl">
        <h1>Products Overview</h1>
      </div>
      <ProductAddButton />
      <div className="grid flex-1 grid-cols-2 content-start gap-2 rounded-lg bg-muted/70 p-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}