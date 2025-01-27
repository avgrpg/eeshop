"use server";

import Link from "next/link";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { getProductCategories } from "~/server/queries";

export async function ProductsCategories({
  urlcategory,
  urlsubcategory,
}: {
  urlcategory: number;
  urlsubcategory: number;
}) {
  const { categories, subcategories } = await getProductCategories();

  return (
    <>
      {/* Categories */}
      <ScrollArea className="grid w-full justify-center pb-2" type="always">
        <div id="categories" className="flex md:gap-6">
          <Link href="?urlcategory=0&urlsubcategory=0" scroll={false}>
            <Button variant="category" aria-selected={urlcategory === 0}>
              Everything
            </Button>
          </Link>
          {categories.map((category) => (
            <Link
              href={`?urlcategory=${category.id}&urlsubcategory=0`}
              scroll={false}
              key={category.id}
            >
              <Button
                variant="category"
                aria-selected={category.id === urlcategory}
              >
                {category.name}
              </Button>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>

      {/* Subcategories */}
      {urlcategory !== 0 && subcategories.length > 0 && (
        <ScrollArea
          className="my-2 grid w-full justify-center pb-2"
          type="always"
        >
          <div className="flex md:gap-6">
            <Link
              href={`?urlcategory=${urlcategory}&urlsubcategory=0`}
              scroll={false}
            >
              <Button variant="category" aria-selected={urlsubcategory === 0}>
                Everything
              </Button>
            </Link>
            {subcategories
              .filter((subcategory) => subcategory.categoryId === urlcategory)
              .map((subcategory) => (
                <Link
                  href={`?urlcategory=${urlcategory}&urlsubcategory=${subcategory.id}`}
                  scroll={false}
                  key={subcategory.id}
                >
                  <Button
                    variant="category"
                    aria-selected={urlsubcategory === subcategory.id}
                  >
                    {subcategory.name}
                  </Button>
                </Link>
              ))}
          </div>
          <ScrollBar orientation="horizontal" className="h-2" />
        </ScrollArea>
      )}
    </>
  );
}
