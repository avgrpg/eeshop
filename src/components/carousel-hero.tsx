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

export function CarouselHero({
  className,
  categories,
}: {
  className?: string;
  categories: Category[];
}) {
  return (
    <Carousel
      className={cn("w-full max-w-xs md:max-w-2xl", className)}
      opts={{
        loop: true,
      }}
      autoplay={true}
      autoplayInterval={5000}
    >
      <CarouselContent>
        {categories.map((category) => (
          <CarouselItem key={category.id}>
            <section className="relative aspect-video w-full overflow-hidden rounded-3xl cursor-pointer">
              {category.imageUrl && (
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />
              )}
              <div className="absolute bottom-5 left-5 flex flex-col bg-background px-5 py-3 gap-2 rounded-xl max-w-xs">
                <h1 className="text-2xl font-bold tracking-tight">{category.name}</h1>
                <p className="text-sm font-medium text-muted-foreground">
                  {category.description}
                </p>
              </div>
              <div className="absolute bottom-5 right-5">
                <Button>
                  View More
                </Button>
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
