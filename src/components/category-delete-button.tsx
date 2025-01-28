"use client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteCategory } from "~/server/form-action";

export const CategoryDeleteButton = ({ categoryId }: { categoryId: number }) => {
    const router = useRouter();
  const handleDelete = async () => {
    toast.loading("Deleting...", {
      id: "delete-category",
    });
    const result = await deleteCategory(categoryId);
    if (!result.ok) {
      toast.dismiss("delete-category");
      toast.error("Something went wrong!");
      return;
    }
    toast.dismiss("delete-category");
    toast.success("Successfully deleted!");
    router.refresh();
  };

  return (
    <button
      className="flex h-6 w-6 items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      onClick={async () => {
        await handleDelete();
      }}
    >
      <Trash size={16} />
    </button>
  );
};