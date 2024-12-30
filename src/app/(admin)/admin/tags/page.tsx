import { Trash2 } from "lucide-react";
import { TagAddButton, TagEditButton } from "~/components/tag-form";
import { deleteTag, getProductTags, type Tag } from "~/server/queries";

const TagDeleteButton = ({ tagId }: { tagId: number }) => {
  return (
    <form
      action={async () => {
        "use server";
        await deleteTag(tagId);
      }}
    >
      <button className="flex h-6 w-6 items-center justify-center rounded-full text-destructive transition-colors duration-200 hover:bg-destructive/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        <Trash2 size={16} />
      </button>
    </form>
  );
};

const TagItem = ({ tag }: { tag: Tag }) => {
  return (
    <li className="flex flex-row gap-2 p-2">
      <span className="inline-flex items-center rounded-lg bg-secondary px-2 py-px text-sm font-medium text-secondary-foreground">
        {tag.name}
      </span>
      <TagEditButton tag={tag} />
      <TagDeleteButton tagId={tag.id} />
    </li>
  );
};

export default async function TagsPage() {
  const tags = await getProductTags();
  return (
    <div className="flex flex-1 flex-col gap-2 p-2">
      <div className="p-2 text-2xl">
        <h1>Product Tags</h1>
      </div>
      <TagAddButton />
      <ul className="flex flex-col divide-y-2 p-2">
        {tags.map((tag) => (
          <TagItem key={tag.id} tag={tag} />
        ))}
      </ul>
    </div>
  );
}
