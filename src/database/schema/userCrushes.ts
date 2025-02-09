import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.ts";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const userCrushes = pgTable("user_crushes", {
    id: serial('id').primaryKey(),
    netId: text('net_id').notNull().references(() => users.netId),
    position: integer('position').notNull(),
    crushId: text('crush_id').notNull().references(() => users.netId),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    isDeleted: boolean('is_deleted').notNull().default(false),  
})

export type InsertUserCrush = InferInsertModel<typeof userCrushes>;
export type SelectUserCrush = InferSelectModel<typeof userCrushes>;