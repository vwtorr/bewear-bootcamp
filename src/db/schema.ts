import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text().notNull(),
});

export const categoryTable = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const categoryRelations = relations(categoryTable, ({ many }) => ({
    products: many(productTable),
  }));

export const productTable = pgTable("product", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categoryTable.id),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


export const productRelations = relations(productTable, ({ one, many }) => ({
    category: one(categoryTable, {
      fields: [productTable.categoryId],
      references: [categoryTable.id],
    }),
    variants: many(productVariantTable),
  }));  

export const productVariantTable = pgTable("product_variant", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => productTable.id),
  name: text().notNull(),
  slug: text().notNull().unique(),
  color: text().notNull(),
  priceInCents: integer("price_in_cents").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const productVariantRelations = relations(productVariantTable, ({ one }) => ({
    product: one(productTable, {
      fields: [productVariantTable.productId],
      references: [productTable.id],
    }),
  }));  