import { AboutUs } from "~/components/about-us";
import { ProductHero } from "~/components/product-hero";
import { ProductSection } from "~/components/product-section";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // const productsWithImagesAndTags = await getProductsWithImagesnTags();

  // const { categories, subcategories } = await getProductCategories();

  // const productsWithImagesAndTagsWithSubcategory =
  //   productsWithImagesAndTags.map((product) => {
  //     return {
  //       ...product,
  //       subcategory: subcategories.find(
  //         (subcategory) => subcategory.id === product.subcategoryId,
  //       ),
  //     };
  //   });

  // const urlParams = await searchParams;
  // const parsedUrlcategory = urlSchema.safeParse(urlParams);
  // const urlcategory = parsedUrlcategory.data?.urlcategory ?? 0;
  // const urlsubcategory = parsedUrlcategory.data?.urlsubcategory ?? 0;

  return (
    <main className="bg-background px-3 md:px-5">
      {/* Hero section */}
      {/* <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:p-2">
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
              <Link href="#">Expore Now</Link>
            </Button>
          </div>
        </div>
        <CarouselHero categories={categories} />
      </div> */}
      <ProductHero />

      <ProductSection searchParams={searchParams} />

      {/* About us section */}
      <section
        className="flex w-full flex-col items-center justify-center py-6"
        id="about"
      >
        <AboutUs />
      </section>
    </main>
  );
}
