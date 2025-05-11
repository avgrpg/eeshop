"use client";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteTag } from "~/server/form-action";

export const TagDeleteButton = ({ tagId }: { tagId: number }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTag(tagId);
    });
  };

  return (
    // <form
    //   action={async () => {
    //     "use server";
    //     await deleteTag(tagId);
    //   }}
    // >
    <button
      className="flex h-6 w-6 items-center justify-center rounded-full text-destructive transition-colors duration-200 hover:bg-destructive/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? (
        <LoaderCircle className="animate-spin" size={16} />
      ) : (
        <Trash2 size={16} />
      )}
    </button>
    // </form>
  );
};
