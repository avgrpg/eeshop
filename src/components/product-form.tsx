"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
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
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { type Tag, type Subcategory } from "~/server/queries";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "~/lib/utils";
import { Check, ChevronsUpDown, Pen, Plus } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

// const productFormSchema = z.object({
//   name: z.string().min(2),
//   price: z.coerce.number().min(1),
//   description: z.string().min(2),
//   subcategoryId: z.number().min(1),
// });

import { productFormSchema } from "~/schema/product-form";
import { onEditProductForm, onSubmitProductForm } from "~/server/form-action";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useRouter } from "next/navigation";

const ProductCategoryCombobox = ({
  subcategories,
  form,
}: {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
  subcategories: Subcategory[];
}) => {
  return (
    <FormField
      control={form.control}
      name="subcategoryId"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <FormLabel>Subcategory</FormLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? subcategories.find(
                        (subcategory) => subcategory.id === field.value,
                      )?.name
                    : "Select a subcategory"}
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
                  <CommandEmpty>No subcategories found.</CommandEmpty>
                  <CommandGroup>
                    {subcategories.map((subcategory) => (
                      <CommandItem
                        key={subcategory.id}
                        value={`${subcategory.id}`}
                        keywords={[
                          subcategory.name,
                          `${subcategory.category?.name}`,
                        ]}
                        onSelect={() => {
                          form.setValue("subcategoryId", subcategory.id);
                        }}
                      >
                        {subcategory.name} - {subcategory.category?.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            subcategory.id === field.value
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
            This is the subcategory of your product.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ProductTagCombobox = ({
  tags,
  form,
}: {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
  tags: Tag[];
}) => {
  return (
    <FormField
      control={form.control}
      name="tagIds"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <FormLabel>Tags</FormLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    field.value?.length === 0 && "text-muted-foreground",
                  )}
                >
                  {field.value?.length === 0
                    ? "Select a tag"
                    : field.value
                        ?.map(
                          (tagId) => tags.find((tag) => tag.id === tagId)?.name,
                        )
                        .join(", ")}
                </Button>
              </FormControl>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Command>
                <CommandInput placeholder="Search tags" className="h-9" />
                <CommandList>
                  {tags.map((tag) => (
                    <CommandItem
                      key={tag.id}
                      value={`${tag.id}`}
                      keywords={[tag.name]}
                      onSelect={() => {
                        if (field.value?.includes(tag.id)) {
                          return field.onChange(
                            field.value.filter((id) => id !== tag.id),
                          );
                        }
                        if (!field.value) {
                          return field.onChange([tag.id]);
                        }
                        field.onChange([...field.value, tag.id]);
                      }}
                    >
                      {tag.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          field.value?.includes(tag.id)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </DropdownMenuContent>
          </DropdownMenu>
          <FormDescription>This is the tags of your product.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type ProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  subcategoryId: number;
  tags: (
    | {
        id: number;
        name: string;
      }
    | undefined
  )[];
};

const ProductForm = ({
  subcategories,
  handleClose,
  tags,
  mode,
  product,
}: {
  subcategories: Subcategory[];
  handleClose: () => void;
  tags: Tag[];
  mode: "edit" | "add";
  product: ProductType;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      // name: "",
      // price: 0,
      // description: "",
      // subcategoryId: undefined,
      // tagIds: [],
      name: product.name,
      price: product.price,
      description: product.description,
      subcategoryId: product.subcategoryId,
      tagIds: product.tags.length > 0 ? product.tags.map((tag) => tag?.id) : [],
    },
  });

  const onSubmit = async (data: z.infer<typeof productFormSchema>) => {
    toast.loading("Submitting...", {
      id: "submit-product",
    });
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("subcategoryId", data.subcategoryId.toString());
    formData.append("tagIds", JSON.stringify(data.tagIds));

    const result =
      mode === "edit"
        ? await onEditProductForm(product.id, formData)
        : await onSubmitProductForm(formData);

    toast.dismiss("submit-product");
    if (result.message === "Success") {
      router.refresh();
      handleClose();
      return toast.success(
        `Successfully ${mode === "edit" ? "edited" : "added"} product!`,
      );
    }
    toast.error("Something went wrong!");
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // action={formAction}
        // onSubmit={async (evt) => {
        //   evt.preventDefault();
        //   await form.handleSubmit(() => {
        //     const formData = new FormData();
        //     const data = form.getValues();
        //     formData.append("name", data.name);
        //     formData.append("price", data.price.toString());
        //     formData.append("description", data.description);
        //     formData.append("subcategoryId", data.subcategoryId.toString());
        //     // formAction(formData);
        //     formRef.current?.submit();
        //   })(evt);
        // }}
        className="space-y-3"
        ref={formRef}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Product Name
                <span className="text-sm text-muted-foreground">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Product Name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                This is the price of your product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product Description" {...field} />
              </FormControl>
              <FormDescription>
                This is the description of your product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ProductCategoryCombobox form={form} subcategories={subcategories} />
        <ProductTagCombobox form={form} tags={tags} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export const ProductEditButton = ({
  product,
  subcategories,
  tags,
}: {
  product: ProductType;
  subcategories: Subcategory[];
  tags: Tag[];
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="absolute top-2 left-2" variant="outline" size="xs">
          <Pen size={16} />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription className="sr-only">
            edit product name
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          product={product}
          handleClose={handleClose}
          mode="edit"
          subcategories={subcategories}
          tags={tags}
        />
      </DialogContent>
    </Dialog>
  );
};

const defaultProduct = {
  id: 0,
  name: "",
  price: 0,
  description: "",
  subcategoryId: 0,
  tags: [],
};
export const AddProductDialog = ({
  subcategories,
  tags,
}: {
  subcategories: Subcategory[];
  tags: Tag[];
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>Add Product</span>
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>
            * Required fields are marked with an asterisk
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          subcategories={subcategories}
          handleClose={handleClose}
          tags={tags}
          mode="add"
          product={defaultProduct}
        />
      </DialogContent>
    </Dialog>
  );
};
