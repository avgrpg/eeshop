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
import { Check, ChevronsUpDown, Pen, Plus } from "lucide-react";
import { type Category } from "~/server/queries";
import { subcategoryFormSchema } from "~/schema/category-form";
import { useRouter } from "next/navigation";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Textarea } from "./ui/textarea";
import { cn } from "~/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  onEditSubcategoryForm,
  onSubmitSubcategoryForm,
} from "~/server/form-action";

const PrimaryCategoryCombobox = ({
  categories,
  form,
}: {
  form: UseFormReturn<z.infer<typeof subcategoryFormSchema>>;
  categories: Category[];
}) => {
  return (
    <FormField
      control={form.control}
      name="categoryId"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <FormLabel>Category</FormLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "min-w-[200px] justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? categories.find((category) => category.id === field.value)
                        ?.name
                    : "Select a category"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Command>
                <CommandInput
                  placeholder="Search subcategories"
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No categories found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.id}
                        value={`${category.id}`}
                        keywords={[category.name]}
                        onSelect={() => {
                          form.setValue("categoryId", category.id);
                        }}
                      >
                        {category.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            category.id === field.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuContent>
          </DropdownMenu>
          <FormDescription>
            This is the category.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const subcategorySchema = subcategoryFormSchema.extend({
  id: z.number().min(1),
});

const SubcategoryForm = ({
  handleClose,
  mode,
  categories,
  subcategory,
}: {
  handleClose: () => void;
  mode: "edit" | "add";
  categories: Category[];
  subcategory: z.infer<typeof subcategorySchema>;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof subcategoryFormSchema>>({
    resolver: zodResolver(subcategoryFormSchema),
    defaultValues: {
      name: subcategory.name,
      description: subcategory.description,
      categoryId: subcategory.categoryId,
    },
  });

  const onSubmit = async (data: z.infer<typeof subcategoryFormSchema>) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId.toString());

    const result =
      mode === "edit"
        ? await onEditSubcategoryForm(subcategory.id, formData)
        : await onSubmitSubcategoryForm(formData);

    if (result.message === "Success") {
      router.push("/admin/categories/sub");
      handleClose();
      return toast.success(
        `Successfully ${mode === "edit" ? "edited" : "added"} subcategory!`,
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
              <FormLabel>Subcategory Name</FormLabel>
              <FormControl>
                <Input placeholder="Subcategory Name" {...field} />
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
              <FormLabel>Subcategory Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Subcategory Description" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <PrimaryCategoryCombobox form={form} categories={categories} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export const SubcategoryEditButton = ({
  subcategory,
  categories,
}: {
  subcategory: z.infer<typeof subcategorySchema>;
  categories: Category[];
}) => {
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
          <DialogTitle>Edit Subcategory</DialogTitle>
          <DialogDescription className="sr-only">
            edit subcategory name
          </DialogDescription>
        </DialogHeader>
        <SubcategoryForm
          subcategory={subcategory}
          handleClose={handleClose}
          mode="edit"
          categories={categories}
        />
      </DialogContent>
    </Dialog>
  );
};

const defaultSubcategory = {
  id: 0,
  name: "",
  description: "",
  categoryId: 0,
};
export const SubcategoryAddButton = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>Add Subcategory</span>
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Subcategory</DialogTitle>
          <DialogDescription className="sr-only">
            add subcategory
          </DialogDescription>
        </DialogHeader>
        <SubcategoryForm
          handleClose={handleClose}
          mode="add"
          categories={categories}
          subcategory={defaultSubcategory}
        />
      </DialogContent>
    </Dialog>
  );
};
