import { SubcategoryDeleteButton } from "~/components/sub/subcategory-delete-button";
import {
  SubcategoryAddButton,
  SubcategoryEditButton,
} from "~/components/subcategory-form";
import {
  type Category,
  getProductCategories,
  type Subcategory,
} from "~/server/queries";

const SubCategoryItem = ({
  subcategory,
  categories,
}: {
  subcategory: Subcategory;
  categories: Category[];
}) => {
  return (
    <li className="flex flex-row gap-2 p-2">
      <span className="inline-flex items-center rounded-lg bg-secondary px-2 py-px text-sm font-medium text-secondary-foreground">
        {subcategory.name}
      </span>

      <span className="inline-flex items-center rounded-lg bg-muted px-2 py-px text-sm text-muted-foreground">
        {subcategory.category?.name}
      </span>

      <span className="inline-flex items-center px-2 py-px text-sm text-muted-foreground">
        {subcategory.description}
      </span>

      <SubcategoryEditButton
        subcategory={subcategory}
        categories={categories}
      />

      <SubcategoryDeleteButton subcategoryId={subcategory.id} />
    </li>
  );
};

export default async function SubCategoriesPage() {
  const { subcategories, categories } = await getProductCategories();

  return (
    <div className="flex flex-1 flex-col gap-2 p-2">
      <div className="p-2 text-2xl">
        <h1>Sub Categories</h1>
      </div>
      <SubcategoryAddButton categories={categories} />
      <ul className="flex flex-col divide-y-2 p-2">
        {subcategories.map((subcategory) => (
          <SubCategoryItem
            key={subcategory.id}
            subcategory={subcategory}
            categories={categories}
          />
        ))}
      </ul>
    </div>
  );
}
