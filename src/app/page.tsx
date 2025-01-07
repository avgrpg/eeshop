import Image from "next/image";
import Link from "next/link";
import { CarouselHero } from "~/components/carousel-hero";
import { Button } from "~/components/ui/button";
import {
  getProductCategories,
  getProductsWithImagesnTags,
} from "~/server/queries";

export default async function HomePage() {
  const productsWithImagesAndTags = await getProductsWithImagesnTags();

  const { categories, subcategories } = await getProductCategories();

  return (
    <main className="px-5">
      {/* Hero section */}
      <div className="flex items-center justify-between p-2">
        <div className="flex max-w-xs flex-col gap-4 p-5">
          <h1 className="text-4xl font-bold">
            Welcome to your new e-commerce store
          </h1>
          <p className="text-sm font-medium text-muted-foreground">
            Explore our wide selection of products and discover the best deals available.
          </p>
          <div>
            <Button className="rounded-full px-10 font-medium">
              <Link href="#">Expore Now</Link>
            </Button>
          </div>
        </div>
        <CarouselHero categories={categories} />
      </div>

      <div className="flex flex-wrap gap-2">
        {productsWithImagesAndTags.map((product) => (
          <div className="w-80 border p-2" key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.subcategoryId}</p>
            <p>{product.tags.map((tag) => tag?.name).join(", ")}</p>
            <div className="flex flex-wrap gap-2">
              {product.images.map((image) => (
                <div className="h-20 w-20 border" key={image.id}>
                  <Image
                    src={image.url}
                    alt={image.url}
                    style={{
                      objectFit: "contain",
                    }}
                    width={80}
                    height={80}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
