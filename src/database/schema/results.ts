import { boolean, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.ts";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const statusEnums = pgEnum("status", ["pending", "accepted"]);
export const results = pgTable("results", {
    id: serial('id').primaryKey(),
    user1: text('user1').notNull().references(() => users.netId),
    user2: text('user2').notNull().references(() => users.netId),
    status: statusEnums("status").notNull().default("pending"),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    isDeleted: boolean('is_deleted').notNull().default(false),
})

export type InsertResult = InferInsertModel<typeof results>;
export type SelectResult = InferSelectModel<typeof results>;