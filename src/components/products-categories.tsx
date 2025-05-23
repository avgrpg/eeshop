"use client";

import Link from "next/link";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { type Category, type Subcategory } from "~/server/queries";
import { urlCategorySchema, urlSubcategorySchema } from "~/schema/url-schema";
import { useSearchParams } from "next/navigation";

export function ProductsCategories({
  // urlcategory,
  // urlsubcategory,
  // searchParams,
  categories,
  subcategories,
}: {
  // urlcategory: number;
  // urlsubcategory: number;
  // searchParams: Promise<Record<string, string | string[] | undefined>>;
  categories: Category[];
  subcategories: Subcategory[];
}) {
  // const urlParams = await searchParams;
  // const parsedUrlcategory = urlSchema.safeParse(urlParams);
  // const urlcategory = parsedUrlcategory.data?.urlcategory ?? 0;
  // const urlsubcategory = parsedUrlcategory.data?.urlsubcategory ?? 0;
  const searchParams = useSearchParams();
  const urlcategory = urlCategorySchema.safeParse(searchParams.get("urlcategory")).data ?? 0;
  const urlsubcategory = urlSubcategorySchema.safeParse(searchParams.get("urlsubcategory")).data ?? 0;

  // const urlParams = await searchParams;
  // const parsedUrlcategory = urlSchema.safeParse(searchParams);
  // const urlcategory = parsedUrlcategory.data?.urlcategory ?? 0;
  // const urlsubcategory = parsedUrlcategory.data?.urlsubcategory ?? 0;
  
  // const { categories, subcategories } = await getProductCategories();

  return (
    <>
      {/* Categories */}
      <ScrollArea className="grid w-full justify-center mb-2 border-2 border-muted-foreground rounded-lg py-px" type="always">
        <div id="categories" className="flex md:gap-6 gap-1">
          <Link
            href="?urlcategory=0&urlsubcategory=0"
            scroll={false}
            // prefetch={false}
            shallow
          >
            <Button variant="category" aria-selected={urlcategory === 0}>
              所有
            </Button>
          </Link>
          {categories.map((category) => (
            <Link
              href={`?urlcategory=${category.id}&urlsubcategory=0`}
              scroll={false}
              key={category.id}
              // prefetch={false}
              id={`category-${category.id}`}
              shallow
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
          className="my-2 grid w-full justify-center mb-2 border-2 border-muted-foreground rounded-lg py-px"
          type="always"
        >
          <div className="flex md:gap-6 gap-1">
            <Link
              href={`?urlcategory=${urlcategory}&urlsubcategory=0`}
              scroll={false}
              // prefetch={false}
              shallow
            >
              <Button variant="category" aria-selected={urlsubcategory === 0}>
                所有
              </Button>
            </Link>
            {subcategories
              .filter((subcategory) => subcategory.categoryId === urlcategory)
              .map((subcategory) => (
                <Link
                  href={`?urlcategory=${urlcategory}&urlsubcategory=${subcategory.id}`}
                  scroll={false}
                  key={subcategory.id}
                  // prefetch={false}
                  id={`subcategory-${subcategory.id}`}
                  shallow
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
