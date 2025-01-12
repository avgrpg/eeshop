import { Trash2 } from "lucide-react";
import Image from "next/image";
import { AddProductDialog, ProductEditButton } from "~/components/product-form";
import { ProductImageManager } from "~/components/product-image-manager";
import {
  deleteProduct,
  getProductCategories,
  getProductsWithImagesnTags,
  getProductTags,
} from "~/server/queries";

import type {
  ProductWithImagesAndTags,
  Subcategory,
  Tag,
} from "~/server/queries";

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

const ProductCard = ({
  product,
  tags,
  subcategories,
}: {
  product: ProductWithImagesAndTags;
  tags: Tag[];
  subcategories: Subcategory[];
}) => {
  return (
    <div className="group relative h-56 overflow-hidden">
      <div className="relative h-40 overflow-hidden rounded-lg bg-primary/20">
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
        <ProductEditButton
          product={product}
          subcategories={subcategories}
          tags={tags}
        />
        <ProductImageManager
          productId={product.id}
          images={product.images}
          className="absolute left-2 top-10"
        />
      </div>
      <div className="flex flex-row-reverse justify-between pl-2 py-3">
        <div className="flex flex-none items-center justify-center">
          <p className="whitespace-nowrap rounded-sm bg-secondary px-3 py-2 text-sm font-semibold leading-tight tracking-tight text-secondary-foreground">
            ${product.price}
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="truncate text-base font-semibold">{product.name}</h1>
          {product.tags.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              {product.tags.map((tag) => (
                <small
                  key={tag?.id}
                  className="text-sm font-medium leading-none text-muted-foreground truncate"
                >
                  {tag?.name}
                </small>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* <div className="flex flex-col px-2 py-1">
        <h1 className="truncate text-lg font-bold">{product.name}</h1>
        <div className="flex flex-row justify-between gap-2">
          <p className="flex-none text-xl font-medium text-primary">
            <span className="text-xs">$ </span>
            {product.price}
          </p>
          <div className="flex flex-row gap-2">
            {product.tags.length > 0 && (
              <div className="flex flex-row items-center gap-1 font-medium">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag?.id}
                    className="truncate py-px text-xs"
                    variant="destructive"
                  >
                    {tag?.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div> */}
      <ProductDeleteButton productId={product.id} />
    </div>
  );
};

const ProductAddButton = async () => {
  // const { subcategories } = await getProductCategories();

  const [{ subcategories }, tags] = await Promise.all([
    getProductCategories(),
    getProductTags(),
  ]);

  return (
    <AddProductDialog subcategories={subcategories} tags={tags} />
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

  const [products, { subcategories }, tags] = await Promise.all([
    getProductsWithImagesnTags(),
    getProductCategories(),
    getProductTags(),
  ]);
  // console.log("products", products);
  // console.log("categories", categories);
  // console.log("subcategories", subcategories);
  // console.log("tags", tags);

  return (
    <div className="flex flex-1 flex-col gap-2 p-2">
      <div className="p-2 text-2xl">
        <h1>Products Overview</h1>
      </div>
      <ProductAddButton />
      <div className="grid flex-1 grid-cols-2 content-start gap-3 p-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            tags={tags}
            subcategories={subcategories}
          />
        ))}
      </div>
    </div>
  );
}
