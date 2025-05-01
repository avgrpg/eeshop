"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { useIsMobile } from "~/hooks/use-mobile";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  RightDrawerContent,
} from "./ui/drawer";

function MobileMenu() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <RightDrawerContent
        className="fixed inset-y-0 left-auto right-0 z-50 mt-0 w-1/2 rounded-none"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerDescription className="sr-only">
            For user to navigate through the page
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-8 py-8">
          <DrawerClose asChild>
            <Link href="/#products" className="rounded-md" prefetch={false}>
              產品
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link href="/#about" className="rounded-md" prefetch={false}>
              關於我們
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <div>
              <ModeToggle isMobile />
            </div>
          </DrawerClose>
        </div>
      </RightDrawerContent>
    </Drawer>
  );
}

export function TopNavLink() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileMenu />;
  }

  return (
    <div className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold leading-none tracking-tight">
      <Link
        href="/#products"
        className="rounded-md bg-background/50 p-2"
        prefetch={false}
      >
        產品
      </Link>
      <Link
        href="/#about"
        className="rounded-md bg-background/50 p-2"
        prefetch={false}
      >
        關於我們
      </Link>
      <ModeToggle />
    </div>
  );
}
