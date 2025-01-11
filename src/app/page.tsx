import Image from "next/image";
import Link from "next/link";
import { CarouselHero } from "~/components/carousel-hero";
import { Button } from "~/components/ui/button";
import { urlSchema } from "~/schema/url-schema";
import {
  getProductCategories,
  getProductsWithImagesnTags,
  type ProductWithImagesAndTags,
} from "~/server/queries";

const ProductCard = ({ product }: { product: ProductWithImagesAndTags }) => {
  return (
    <div className="group relative h-56 overflow-hidden">
      <div className="relative h-40 overflow-hidden rounded-lg bg-primary/20">
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

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const productsWithImagesAndTags = await getProductsWithImagesnTags();

  const { categories, subcategories } = await getProductCategories();
  console.log(categories, subcategories, productsWithImagesAndTags);

  const productsWithImagesAndTagsWithSubcategory =
    productsWithImagesAndTags.map((product) => {
      return {
        ...product,
        subcategory: subcategories.find(
          (subcategory) => subcategory.id === product.subcategoryId,
        ),
      };
    });
  console.log(productsWithImagesAndTagsWithSubcategory);

  const urlParams = await searchParams;
  const parsedUrlcategory = urlSchema.safeParse(urlParams);
  const urlcategory = parsedUrlcategory.data?.urlcategory ?? 0;
  const urlsubcategory = parsedUrlcategory.data?.urlsubcategory ?? 0;

  return (
    <main className="px-5">
      {/* Hero section */}
      <div className="flex items-center justify-between p-2">
        <div className="flex max-w-xs flex-col gap-4 p-5">
          <h1 className="text-4xl font-bold">
            Welcome to your new e-commerce store
          </h1>
          <p className="text-sm font-medium text-muted-foreground">
            Explore our wide selection of products and discover the best deals
            available.
          </p>
          <div>
            <Button className="rounded-full px-10 font-medium">
              <Link href="#">Expore Now</Link>
            </Button>
          </div>
        </div>
        <CarouselHero categories={categories} />
      </div>

      {/* Product Section */}
      <section className="flex w-full flex-col items-center justify-center py-6">
        <div className="flex flex-col gap-2 p-12 text-center">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <small className="text-sm font-medium text-muted-foreground">
            View all products. You can filter by subcategory. You can also sort
            by price.
          </small>
        </div>

        {/* Categories */}
        <div id="categories" className="flex flex-wrap gap-6 pb-3">
          <Link href="?urlcategory=0&urlsubcategory=0">
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

        {/* Subcategories */}
        {urlcategory !== 0 && subcategories.length > 0 && (
          <div className="flex flex-wrap gap-6 p-3">
            <Link href={`?urlcategory=${urlcategory}&urlsubcategory=0`}>
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
        )}

        <div className="grid flex-1 grid-cols-2 content-start gap-3 p-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productsWithImagesAndTagsWithSubcategory
            .filter((product) => {
              if (urlcategory === 0) {
                return true;
              }
              if (urlsubcategory === 0) {
                return product.subcategory?.categoryId === urlcategory;
              }
              return (
                product.subcategory?.categoryId === urlcategory &&
                product.subcategory?.id === urlsubcategory
              );
            })
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>

      {/* About us section */}
      <section className="flex w-full flex-col items-center justify-center">
        <div className="flex flex-col gap-2 p-12 text-center">
          <h2 className="text-2xl font-bold">About Us</h2>
          <small className="text-sm font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            adipisci, asperiores, delectus, doloremque, fugiat, labore, neque
            odit, quisquam, quos, repellat, temporibus, veniam, voluptate
            voluptas.
          </small>
        </div>
      </section>
    </main>
  );
}
