"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Pen, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { categoryFormSchema } from "~/schema/category-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { type z } from "zod";
import { Textarea } from "./ui/textarea";
import { onEditCategoryForm, onSubmitCategoryForm } from "~/server/form-action";
import { type Category } from "~/server/queries";

const CategoryForm = ({
  category,
  handleClose,
  mode,
}: {
  category: Category;
  handleClose: () => void;
  mode: "edit" | "add";
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });

  const onSubmit = async (data: z.infer<typeof categoryFormSchema>) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);

    const result =
      mode === "edit"
        ? await onEditCategoryForm(category.id, formData)
        : await onSubmitCategoryForm(formData);

    if (result.message === "Success") {
      router.refresh();
      handleClose();
      return toast.success(
        `Successfully ${mode === "edit" ? "edited" : "added"} category!`,
      );
    }
    console.log(result);
    toast.error("Something went wrong!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Category Name" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Category Description" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export const CategoryEditButton = ({ category }: { category: Category }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex h-6 w-6 items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <Pen size={16} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription className="sr-only">
            edit category name
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          category={category}
          handleClose={handleClose}
          mode="edit"
        />
      </DialogContent>
    </Dialog>
  );
};

const defaultCategory = {
  id: 0,
  name: "",
  description: "",
};
export const CategoryAddButton = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="flex items-center gap-2">
          <span>Add Category</span>
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription className="sr-only">
            add category
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          handleClose={handleClose}
          mode="add"
          category={defaultCategory}
        />
      </DialogContent>
    </Dialog>
  );
};
