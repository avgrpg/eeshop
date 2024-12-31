"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UploadButton } from "~/utils/uploadthing";

export const CategoryUploadButton = ({
  categoryId,
}: {
  categoryId: number;
}) => {
    const router = useRouter();
  return (
    <UploadButton
      endpoint="categoryImageUploader"
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
      headers={{
        categoryId: categoryId.toString(),
      }}
    />
  );
};
