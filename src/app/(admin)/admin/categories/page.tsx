import { CategoryAddButton, CategoryEditButton } from "~/components/category-form";
import { type Category, getProductCategories } from "~/server/queries";

const CategoryItem = ({ category }: { category: Category }) => {
  return (
    <li className="flex flex-row gap-2 p-2">
      <span className="inline-flex items-center rounded-lg bg-secondary px-2 py-px text-sm font-medium text-secondary-foreground">
        {category.name}
      </span>

      <span className="inline-flex items-center px-2 py-px text-sm text-muted-foreground">
        {category.description}
      </span>

      <CategoryEditButton category={category} />
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
