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
  name: varchar("name", { length: 256 }).notNull().unique(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
});

export const subcategories = createTable("subcategory", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  description: text("description").notNull(),
});

export const tags = createTable("tag", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 64 }).notNull().unique(),
});

// table for products, contains product name, price, description, images, category, tags, and other usual fields
export const products = createTable(
  "product",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    price: integer("price").notNull(),
    description: text("description").notNull(),
    // category is ref to category table
    subcategoryId: integer("subcategory_id")
      .references(() => subcategories.id)
      .notNull(),
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

// Junction table for products and tags
export const productTags = createTable("product_tags", {
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
  tagId: integer("tag_id")
    .references(() => tags.id)
    .notNull(),
});

// Table for product images
export const productImages = createTable("product_images", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
  url: text("url").notNull(),
  order: integer("order").notNull().default(0), // For maintaining image order
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
