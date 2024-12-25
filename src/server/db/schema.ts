// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `eeshop_${name}`);

// two level category, first level is category, second level is subcategory, subcategory will be refered as categoryId in product table
export const categories = createTable("category", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const subcategories = createTable("subcategory", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 256 }).notNull(),
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
});

// table for products, contains product name, price, description, images, category, tags, and other usual fields
export const products = createTable(
  "product",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    price: integer("price").notNull(),
    description: text("description").notNull(),
    // images is an array of strings
    images: varchar("images", { length: 1024 })
      .array()
      .notNull()
      .default(sql`'{}'::varchar[]`),
    // category is ref to category table
    subcategoryId: integer("subcategory_id")
      .references(() => subcategories.id)
      .notNull(),
    // tags is an array of strings
    tags: varchar("tags", { length: 256 })
      .array()
      .notNull()
      .default(sql`'{}'::varchar[]`),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (product) => ({
    nameIndex: index("name_idx").on(product.name),
  }),
);
