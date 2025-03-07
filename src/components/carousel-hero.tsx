"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import { type Category } from "~/server/queries";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { blurDataURL } from "~/constant";

export function CarouselHero({
  className,
  categories,
}: {
  className?: string;
  categories: Category[];
}) {
  return (
    <Carousel
      className={cn("w-full max-w-sm md:max-w-2xl", className)}
      opts={{
        loop: true,
      }}
      autoplay={true}
      autoplayInterval={5000}
    >
      <CarouselContent>
        {categories.map((category) => (
          <CarouselItem key={category.id}>
            <section className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-3xl">
              {category.imageUrl && (
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              )}
              <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b to-transparent from-black/50 blur-3xl"></div>
              <div className="absolute left-5 top-5 flex max-w-40 flex-col gap-2 rounded-xl px-3 py-2 text-white md:max-w-xs md:px-5 md:py-3">
                <h1 className="text-lg font-bold leading-tight tracking-tight md:text-2xl">
                  {category.name}
                </h1>
                <p className="line-clamp-5 text-xs font-medium md:text-sm">
                  {category.description}
                </p>
              </div>
              <div className="absolute bottom-5 right-5">
                <Link
                  href={`?urlcategory=${category.id}&urlsubcategory=0#products`}
                  prefetch={false}
                  onClick={() => {
                    window.document.getElementById(`category-${category.id}`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  <Button>查看更多</Button>
                </Link>
              </div>
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
