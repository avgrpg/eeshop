import Link from "next/link";
import { Button } from "./ui/button";
import { CarouselHero } from "./carousel-hero";
import { getProductCategories } from "~/server/queries";

export async function ProductHero() {
  const { categories } = await getProductCategories();
  return (
    <div className="flex flex-col items-center justify-between gap-6 md:gap-10 lg:gap-12 md:flex-row md:p-2 lg:p-10 xl:p-16">
      <div className="flex max-w-xs flex-col gap-4 p-2 md:p-5">
        <h1 className="text-3xl font-bold md:text-5xl tracking-wide l">
          歡迎光臨 JOSEPH CHAN 的線上商店！
        </h1>
        <p className="text-xs font-medium text-muted-foreground md:text-sm">
          探索我們豐富的產品系列，發掘現有的優惠產品！
        </p>
        <div>
          <Button className="hidden rounded-full px-10 font-medium md:flex">
            <Link href="#products" prefetch={false}>
              立即探索
            </Link>
          </Button>
        </div>
      </div>
      <CarouselHero categories={categories} />
    </div>
  );
}
