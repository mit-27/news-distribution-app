import { pgTable, serial, text, uuid, varchar, boolean, timestamp } from "drizzle-orm/pg-core";

export const news = pgTable("news", {
    id: varchar("id").primaryKey(),
    sourceName: varchar("source_name"),
    title: varchar("title").notNull(),
    description: varchar("description"),
    imageUrl: varchar("image_url"),
})

export const user = pgTable("users", {
    id: varchar("id").primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean("email_verfied").default(false),
    image: text("image"),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow()
})

