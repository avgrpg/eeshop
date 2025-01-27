"use client";

import { useState } from "react";
import { useIsMobile } from "~/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  type Subcategory,
  type ProductWithImagesAndTags,
} from "~/server/queries";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { ChevronLeft } from "lucide-react";

interface productsWithImagesAndTagsWithSubcategory
  extends ProductWithImagesAndTags {
  subcategory: Subcategory | undefined;
}

export function ResponseDialogDrawer({
  children,
  product,
}: {
  children: React.ReactNode;
  product: productsWithImagesAndTagsWithSubcategory;
}) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  // console.log(product);
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <div>{children}</div>
        </DrawerTrigger>
        <DrawerOverlay className="fixed inset-0 z-50 h-1/4 duration-300 fade-in-0">
          {product.images[0]?.url && (
            <Image
              src={product.images[0].url}
              alt={product.images[0].url}
              // width={200}
              // height={160}
              fill
              className="object-cover brightness-50"
              sizes="100vw"
            />
          )}
          <div className="fixed top-0 flex h-1/5 max-w-[85%] items-end px-6 py-3 text-background">
            <h2 className="text-2xl font-bold">{product.name}</h2>
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
        <DrawerContent className="h-4/5 rounded-2xl">
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
                    <Image
                      key={image.url}
                      src={image.url}
                      alt={image.url}
                      width={200}
                      height={160}
                      className="h-40 w-auto rounded-sm"
                    />
                  ))}
                </div>
              )}
              <ScrollBar orientation="horizontal" className="h-2" />
            </ScrollArea>

            <div className="pb-2 pt-4">
              <p className="text-sm font-medium text-muted-foreground">
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
          <DrawerFooter className="flex items-center pb-6">
            <div>
              <DrawerClose asChild>
                <Button variant="outline" className="w-auto">
                  How to Buy
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youa re done.
          </DialogDescription>
        </DialogHeader>
        sth
      </DialogContent>
    </Dialog>
  );
}
