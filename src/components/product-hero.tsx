import Link from "next/link";
import { Button } from "./ui/button";
import { CarouselHero } from "./carousel-hero";
import { getProductCategories } from "~/server/queries";

export async function ProductHero() {
  const { categories } = await getProductCategories();
  return (
    <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:p-2 lg:p-5 xl:p-10">
      <div className="flex max-w-xs flex-col gap-4 p-2 md:p-5">
        <h1 className="text-xl font-bold md:text-4xl">
          Welcome to your new e-commerce store
        </h1>
        <p className="text-xs font-medium text-muted-foreground md:text-sm">
          Explore our wide selection of products and discover the best deals
          available.
        </p>
        <div>
          <Button className="hidden rounded-full px-10 font-medium md:flex">
            <Link href="#products" prefetch={false}>
              Expore Now
            </Link>
          </Button>
        </div>
      </div>
      <CarouselHero categories={categories} />
    </div>
  );
}
