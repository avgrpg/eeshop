import { useIsMobile } from "~/hooks/use-mobile";
import { Button } from "./ui/button";
import {
  DrawerContent,
  DrawerNestedRoot,
  DrawerTrigger,
} from "./ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";
import { AboutUsSection } from "./about-us";
import { ScrollArea } from "./ui/scroll-area";

export function HowToBuy() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <DrawerNestedRoot>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-auto">
            How to Buy
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-3/5 rounded-t-2xl">
        <ScrollArea className="h-full px-5">
            
          <AboutUsSection className="px-5 py-2 my-2" />
        </ScrollArea>
        </DrawerContent>
      </DrawerNestedRoot>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-auto">
          How to Buy
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[80vw]">
        <AboutUsSection className="p-10" />
      </DialogContent>
    </Dialog>
  );
}
