"use client";

import { type ProductWithImagesAndTags } from "~/server/queries";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
// import { cn } from "~/lib/utils";
import { FileImage } from "lucide-react";
import { UploadDropzone } from "~/utils/uploadthing";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductImageDeleteButton } from "./product-image-delete";

export const ProductImageManager = ({
  productId,
  images,
  className,
}: {
  productId: number;
  images: ProductWithImagesAndTags["images"];
  className: string;
}) => {
  console.log(images);
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={className} size="xs">
          <FileImage size={16} />
          <span>Images</span>
        </Button>
      </DialogTrigger>
      <DialogContent
      // className="max-w-screen-xl"
      >
        <DialogHeader>
          <DialogTitle>Manage Images</DialogTitle>
          <DialogDescription className="sr-only">
            manage product images
          </DialogDescription>
        </DialogHeader>
        <section className="grid grid-cols-3 gap-2">
          {images.map((image) => (
            <div key={image.url} className="flex flex-col gap-2">
              <a href={image.url} target="_blank" rel="noreferrer">
                <Image
                  src={image.url}
                  alt={image.url}
                  className="w-40 rounded-lg"
                  width="160"
                  height="160"
                />
              </a>
              <ProductImageDeleteButton imageId={image.id} />
            </div>
          ))}
        </section>
        <UploadDropzone
          endpoint="imageUploader"
          onUploadBegin={() => {
            console.log("upload begin");
            toast.loading("Uploading...", {
              id: "upload-image",
            });
          }}
          onClientUploadComplete={(res) => {
            console.log(res);
            toast.dismiss("upload-image");
            toast.success("Successfully uploaded!");
            router.refresh();
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
            toast.dismiss("upload-image");
            toast.error("Something went wrong!");
          }}
          headers={{
            productId: productId.toString(),
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
