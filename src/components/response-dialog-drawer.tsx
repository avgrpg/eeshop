"use client";

import { useIsMobile } from "~/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerOverlay,
  DrawerTitle,
  // DrawerTrigger,
} from "./ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "./ui/dialog";
import {
  type Subcategory,
  type ProductWithImagesAndTags,
} from "~/server/queries";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { ChevronLeft } from "lucide-react";
import { HowToBuy } from "./how-to-buy";
import { ImageWithLoader } from "./ImageWithLoader";

interface productsWithImagesAndTagsWithSubcategory
  extends ProductWithImagesAndTags {
  subcategory: Subcategory | undefined;
}

const ProductDisplay = ({
  product,
}: {
  product: productsWithImagesAndTagsWithSubcategory;
}) => {
  return (
    <ScrollArea className="h-full px-5">
      <div className="p-2">
        <strong className="text-xl font-bold leading-none tracking-tight">
          $ {product.price}
        </strong>
      </div>

      {product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 py-2">
          {product.tags.map((tag) => (
            <small
              key={tag?.id}
              className="truncate rounded-sm bg-muted px-2.5 py-1 text-sm font-medium leading-none text-muted-foreground"
            >
              {tag?.name}
            </small>
          ))}
        </div>
      )}

      <ScrollArea className="grid h-44 w-full justify-center">
        {product.images.length > 0 && (
          <div className="flex gap-2 py-2">
            {product.images.map((image) => (
              <ImageWithLoader
                key={image.url}
                src={image.url}
                alt={image.url}
                width={200}
                height={160}
                className="h-40 w-auto rounded-sm"
                // placeholder="blur"
                // blurDataURL={blurDataURL}
              />
            ))}
          </div>
        )}
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>

      <div className="pb-2 pt-4">
        <p className="whitespace-pre-line text-sm font-medium text-muted-foreground">
          {product.description}
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t-2 border-border py-2 font-medium text-muted-foreground">
        <div className="flex flex-col gap-2 py-1">
          <p className="font-medium text-foreground">Category:</p>
          <span className="pl-3 text-sm font-medium text-muted-foreground">
            {product.subcategory?.category?.name}
          </span>
        </div>
        <div className="flex flex-col gap-2 py-1">
          <p className="font-medium text-foreground">Subcategory:</p>
          <span className="pl-3 text-sm font-medium text-muted-foreground">
            {product.subcategory?.name}
          </span>
        </div>
      </div>
    </ScrollArea>
  );
};

export function ResponseDialogDrawer({
  product,
  open,
  setOpen,
}: {
  product: productsWithImagesAndTagsWithSubcategory | false;
  open: boolean;
  setOpen: React.Dispatch<
    React.SetStateAction<productsWithImagesAndTagsWithSubcategory | false>
  >;
}) {
  // const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  // console.log(product);
  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={(open) => setOpen(open ? product : false)}
      >
        {/* <DrawerTrigger asChild>
          <div>{children}</div>
        </DrawerTrigger> */}
        <DrawerOverlay className="fixed inset-0 z-50 h-1/4 duration-300 fade-in-0">
          <div className="fixed top-0 h-full w-full bg-black/70 backdrop-blur-sm"></div>
          {product && product.images[0]?.url && (
            <ImageWithLoader
              src={product.images[0].url}
              alt={product.images[0].url}
              // width={200}
              // height={160}
              fill
              className="object-cover brightness-50"
              sizes="100vw"
              loaderClassName="bg-muted/10"
              // placeholder="blur"
              // blurDataURL={blurDataURL}
            />
          )}
          <div className="fixed top-0 flex h-1/5 max-w-[85%] items-end py-4 pl-12 text-background">
            <div className="flex min-h-20 items-center">
              <DrawerTitle className="text-2xl font-bold">
                {product && product.name}
              </DrawerTitle>
            </div>
          </div>
          <div className="fixed top-0 px-4 py-5 text-background">
            <DrawerClose asChild>
              <button>
                <span className="sr-only">Close</span>
                <ChevronLeft size={20} />
              </button>
            </DrawerClose>
          </div>
        </DrawerOverlay>
        <DrawerContent className="h-4/5 rounded-t-2xl">
          <DrawerDescription className="sr-only">
            {product && product.description}
          </DrawerDescription>
          {product && <ProductDisplay product={product} />}
          <DrawerFooter className="flex items-center pb-6">
            <div>
              <HowToBuy />
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => setOpen(open ? product : false)}
    >
      {/* <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger> */}
      <DialogContent className="min-w-[80vw]">
        <DialogHeader className="p-6">
          <DialogTitle>{product && product.name}</DialogTitle>
          <DialogDescription className="sr-only">
            {product && product.description}
          </DialogDescription>
        </DialogHeader>
        {product && <ProductDisplay product={product} />}
        <DialogFooter className="flex w-full items-center justify-center pb-6 sm:justify-center">
          <div>
            <HowToBuy />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
