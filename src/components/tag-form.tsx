"use client";

import { type Tag } from "~/server/queries";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Pen, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tagFormSchema } from "~/schema/tag-form";
import { type z } from "zod";
import { onEditTagForm, onSubmitTagForm } from "~/server/form-action";
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
import { Button } from "./ui/button";

const TagForm = ({
  tag,
  handleClose,
  mode,
}: {
  tag: Tag;
  handleClose: () => void;
  mode: "edit" | "add";
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof tagFormSchema>>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      name: tag.name,
    },
  });

  const onSubmit = async (data: z.infer<typeof tagFormSchema>) => {
    toast.loading("Submitting...", {
      id: "submit-tag",
    });
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);

    // const result = await onEditTagForm(tag.id, formData);
    const result =
      mode === "edit"
        ? await onEditTagForm(tag.id, formData)
        : await onSubmitTagForm(formData);

    toast.dismiss("submit-tag");
    if (result.message === "Success") {
      router.push("/admin/tags");
      handleClose();
      return toast.success(
        `Successfully ${mode === "edit" ? "edited" : "added"} tag!`,
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
              <FormLabel>Edit Tag Name</FormLabel>
              <FormControl>
                <Input placeholder="Tag Name" {...field} />
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

export const TagEditButton = ({ tag }: { tag: Tag }) => {
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
          <DialogTitle>Edit Tag</DialogTitle>
          <DialogDescription className="sr-only">
            edit tag name
          </DialogDescription>
        </DialogHeader>
        <TagForm tag={tag} handleClose={handleClose} mode="edit" />
      </DialogContent>
    </Dialog>
  );
};

const defaultTag = {
  id: 0,
  name: "",
};
export const TagAddButton = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="flex items-center gap-2">
          <span>Add Tag</span>
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Tag</DialogTitle>
          <DialogDescription className="sr-only">
            add tag name
          </DialogDescription>
        </DialogHeader>
        <TagForm handleClose={handleClose} tag={defaultTag} mode="add" />
      </DialogContent>
    </Dialog>
  );
};
