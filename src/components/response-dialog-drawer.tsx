"use client";

import { useState } from "react";
import { useIsMobile } from "~/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
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
  // console.log(product.subcategory)
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
            <div>{children}</div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you are done.
            </DrawerDescription>
          </DrawerHeader>
          sth
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
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
