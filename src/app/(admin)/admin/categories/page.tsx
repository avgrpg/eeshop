import Image from "next/image";
import { CategoryDeleteButton } from "~/components/category-delete-button";
import {
  CategoryAddButton,
  CategoryEditButton,
} from "~/components/category-form";
import { CategoryUploadButton } from "~/components/category-upload-button";
import { type Category, getProductCategories } from "~/server/queries";

const CategoryItem = ({ category }: { category: Category }) => {
  return (
    <li className="flex flex-row items-center gap-2 p-2">
      {category.imageUrl ? (
        <Image
          src={category.imageUrl}
          alt={category.imageUrl}
          width={96}
          height={96}
          className="rounded-lg"
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-secondary">
          <span className="text-sm font-medium text-muted-foreground">
            No Image
          </span>
        </div>
      )}
      <div className="flex flex-col justify-center gap-1">
        <span className="inline-flex items-center rounded-lg bg-secondary px-2 py-px text-sm font-medium text-secondary-foreground">
          {category.name}
        </span>

        <span className="inline-flex items-center px-2 py-px text-sm text-muted-foreground">
          {category.description}
        </span>
      </div>

      <CategoryEditButton category={category} />
      <CategoryDeleteButton categoryId={category.id} />
      <div className="flex grow justify-end">
        <CategoryUploadButton categoryId={category.id} />
      </div>
    </li>
  );
};

export default async function CategoriesPage() {
  const { categories } = await getProductCategories();

  return (
    <div className="flex flex-1 flex-col gap-2 p-2">
      <div className="p-2 text-2xl">
        <h1>Categories</h1>
      </div>
      <CategoryAddButton />
      <ul className="flex flex-col divide-y-2 p-2">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    </div>
  );
}
