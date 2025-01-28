import {
  type ProductWithImagesAndTags,
  getProductsWithImagesnTags,
  getProductCategories,
} from "~/server/queries";
import { ResponseDialogDrawer } from "./response-dialog-drawer";
import Image from "next/image";
import { Button } from "./ui/button";
import { ProductDisplayCards } from "./product-display-cards";

// interface productsWithImagesAndTagsWithSubcategory
//   extends ProductWithImagesAndTags {
//   subcategory: Subcategory | undefined;
// }

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function ProductsDisplay({
  urlcategory,
  urlsubcategory,
  // searchParams,
}: {
  urlcategory: number;
  urlsubcategory: number;
  // searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const productsWithImagesAndTagsData = getProductsWithImagesnTags();
  const productsCategoriesData = getProductCategories();

  const [productsWithImagesAndTags, { subcategories }] =
    await Promise.all([
      productsWithImagesAndTagsData,
      productsCategoriesData,
      // searchParams,
      delay(300),
    ]);

  // const urlParams = await searchParams;
  // const parsedUrlcategory = urlSchema.safeParse(urlParams);
  // const urlcategory = parsedUrlcategory.data?.urlcategory ?? 0;
  // const urlsubcategory = parsedUrlcategory.data?.urlsubcategory ?? 0;

  const productsWithImagesAndTagsWithSubcategory =
    productsWithImagesAndTags.map((product) => {
      return {
        ...product,
        subcategory: subcategories.find(
          (subcategory) => subcategory.id === product.subcategoryId,
        ),
      };
    });

  const filteredProducts = productsWithImagesAndTagsWithSubcategory.filter(
    (product) => {
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
    },
  );

  return (
    <ProductDisplayCards
      filteredProducts={filteredProducts}
      urlcategory={urlcategory}
      urlsubcategory={urlsubcategory}
    />
    // <div className="grid flex-1 grid-cols-2 content-start gap-3 py-2 pt-3 md:grid-cols-3 md:px-7 lg:grid-cols-4 xl:grid-cols-5">
    //   {filteredProducts.map((product) => (
    //     <ResponseDialogDrawer key={product.id} product={product}>
    //       <ProductCard
    //         product={product}
    //         tag={
    //           urlsubcategory === 0 && (
    //             <Button
    //               variant="secondary"
    //               className="absolute left-3 top-3"
    //               size="sm"
    //             >
    //               <span className="max-w-20 truncate">
    //                 {/* {product.subcategory?.name} */}
    //                 {urlcategory === 0
    //                   ? product.subcategory?.category?.name
    //                   : product.subcategory?.name}
    //               </span>
    //             </Button>
    //           )
    //         }
    //       />
    //     </ResponseDialogDrawer>
    //   ))}
    // </div>
  );
}
