import { ProductsDisplay } from "./products-display";
import { ProductsCategories } from "./products-categories";
import { urlSchema } from "~/schema/url-schema";
import { Suspense } from "react";

export async function ProductSection({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <section
      className="flex w-full flex-col items-center justify-center py-6"
      id="products"
    >
      <div className="flex flex-col gap-2 p-12 text-center">
        <h2 className="text-lg font-bold md:text-2xl">Featured Products</h2>
        <small className="text-xs font-medium text-muted-foreground md:text-sm">
          View all products. You can filter by subcategory. You can also sort by
          price.
        </small>
      </div>

      <ProductsCategories
        searchParams={searchParams}
        // urlcategory={urlcategory}
        // urlsubcategory={urlsubcategory}
      />

      <Suspense fallback={<div>Loading...</div>}>
        <ProductsDisplay
          searchParams={searchParams}
          // urlcategory={urlcategory}
          // urlsubcategory={urlsubcategory}
        />
      </Suspense>
    </section>
  );
}
