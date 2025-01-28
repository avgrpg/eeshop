import { ProductsDisplay } from "./products-display";
import { ProductsCategories } from "./products-categories";
import { Suspense } from "react";
import { urlSchema } from "~/schema/url-schema";
import { Skeleton } from "./ui/skeleton";

const ProductLoading = () => (
  <div className="grid flex-1 grid-cols-2 content-start gap-3 py-2 pt-3 md:grid-cols-3 md:px-7 lg:grid-cols-4 xl:grid-cols-5">
    {Array.from({ length: 6 }).map((_, i) => (
      <Skeleton
        key={i}
        className="flex h-64 min-w-48 items-center justify-center rounded-lg"
      >
        <svg
          className={`h-16 w-16 animate-spin text-foreground`}
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </Skeleton>
    ))}
  </div>
);

export async function ProductSection({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const urlParams = await searchParams;
  const parsedUrlcategory = urlSchema.safeParse(urlParams);
  const urlcategory = parsedUrlcategory.data?.urlcategory ?? 0;
  const urlsubcategory = parsedUrlcategory.data?.urlsubcategory ?? 0;

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
        // searchParams={searchParams}
        urlcategory={urlcategory}
        urlsubcategory={urlsubcategory}
      />

      <Suspense
        fallback={<ProductLoading />}
        key={`${urlcategory}-${urlsubcategory}`}
      >
        <ProductsDisplay
          // searchParams={searchParams}
          urlcategory={urlcategory}
          urlsubcategory={urlsubcategory}
        />
      </Suspense>
    </section>
  );
}
