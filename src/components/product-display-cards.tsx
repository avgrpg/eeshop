"use client";
import {
  type Subcategory,
  type ProductWithImagesAndTags,
} from "~/server/queries";
import { ResponseDialogDrawer } from "./response-dialog-drawer";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";

interface productsWithImagesAndTagsWithSubcategory
  extends ProductWithImagesAndTags {
  subcategory: Subcategory | undefined;
}

const ProductCard = ({
  product,
  tag,
  onClick,
}: {
  product: ProductWithImagesAndTags;
  tag?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div className="group relative h-64 cursor-pointer overflow-hidden"
        onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden rounded-lg bg-primary/20">
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
        {tag}
      </div>
      <div className="flex flex-row-reverse justify-between py-3 pl-2">
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
                  className="truncate text-sm font-medium leading-none text-muted-foreground"
                >
                  {tag?.name}
                </small>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function ProductDisplayCards({
  filteredProducts,
  urlcategory,
  urlsubcategory,
}: {
  filteredProducts: productsWithImagesAndTagsWithSubcategory[];
  urlcategory: number;
  urlsubcategory: number;
}) {
  const [currentProduct, setCurrentProduct] =
    useState<productsWithImagesAndTagsWithSubcategory | null>(null);

  return (
    <div className="grid flex-1 grid-cols-2 content-start gap-3 py-2 pt-3 md:grid-cols-3 md:px-7 lg:grid-cols-4 xl:grid-cols-5">
        {
            currentProduct &&
            <ResponseDialogDrawer
        //   key={product.id}
          product={currentProduct}
          open={currentProduct}
          setOpen={setCurrentProduct}
        />}
      {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            tag={
              urlsubcategory === 0 && (
                <Button
                  variant="secondary"
                  className="absolute left-3 top-3"
                  size="sm"
                >
                  <span className="max-w-20 truncate">
                    {/* {product.subcategory?.name} */}
                    {urlcategory === 0
                      ? product.subcategory?.category?.name
                      : product.subcategory?.name}
                  </span>
                </Button>
              )
            }
            onClick={() => setCurrentProduct(product)}
          />
        ))}
        {/* </ResponseDialogDrawer> */}
    </div>
  );
}
