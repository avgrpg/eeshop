import { TagAddButton, TagEditButton } from "~/components/tag-form";
import { getProductTags, type Tag } from "~/server/queries";
import { TagDeleteButton } from "~/components/tag/tag-delete-buttonn";

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
