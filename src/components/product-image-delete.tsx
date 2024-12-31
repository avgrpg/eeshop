import { deleteProductImage } from "~/server/form-action";
import { Button } from "./ui/button";
import { FileImage } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const ProductImageDeleteButton = ({ imageId }: { imageId: number }) => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="xs"
      onClick={async () => {
        toast.loading("Deleting...", {
          id: "delete-image",
        });
        const result = await deleteProductImage(imageId);
        toast.dismiss("delete-image");
        if (result.message === "Success") {
          toast.success("Successfully deleted!");
          router.refresh();
          return;
        }
        return toast.error("Something went wrong!");
      }}
    >
      <FileImage size={16} />
      <span>Delete</span>
    </Button>
  );
};
