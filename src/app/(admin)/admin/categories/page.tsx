import Image from "next/image";
import {
  CategoryAddButton,
  CategoryEditButton,
} from "~/components/category-form";
import { CategoryUploadButton } from "~/components/category-upload-button";
import { type Category, getProductCategories } from "~/server/queries";

const CategoryItem = ({ category }: { category: Category }) => {
  return (
    <li className="flex flex-row gap-2 p-2 items-center">
      {category.imageUrl ? (
        <Image
          src={category.imageUrl}
          alt={category.imageUrl}
          width={96}
          height={96}
          className="rounded-lg"
        />
      ): (
        <div className="w-24 h-24 rounded-lg bg-secondary flex items-center justify-center">
          <span className="text-sm font-medium text-muted-foreground">
            No Image
          </span>
        </div>
      )}
      <div className="flex flex-col gap-1 justify-center">
        <span className="inline-flex items-center rounded-lg bg-secondary px-2 py-px text-sm font-medium text-secondary-foreground">
          {category.name}
        </span>

        <span className="inline-flex items-center px-2 py-px text-sm text-muted-foreground">
          {category.description}
        </span>
      </div>

      <CategoryEditButton category={category} />
      <div className="grow flex justify-end">
      <CategoryUploadButton categoryId={category.id} />
      </div>
    </li>
  );
};

export default async function CategoriesPage() {
  const { categories } = await getProductCategories();

  console.log(categories);

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
