import { type AnyPgColumn, pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

const fileTypeEnum: readonly [string, ...string[]] = ["pdf", "docx", "txt", "jpg"];

export const directories = pgTable("directories", {
  id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(),
  parent_id: t.integer("parent_id").references((): AnyPgColumn => directories.id, { onDelete: "cascade" }),
  name: t.varchar("name").notNull(),
  createdAt: t.timestamp("created_at").defaultNow(),
  updatedAt: t.timestamp("updated_at").defaultNow(),
}, (pgTable) => [
  t.index("directories_parent_id_idx").on(pgTable.parent_id, pgTable.name),
  t.unique("directories_name_parent_id_unique_idx").on(pgTable.name, pgTable.parent_id),
]);

export const fileType = t.pgEnum("file_type", fileTypeEnum);

export const files = pgTable("files", {
  id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(),
  directory_id: t.integer("directory_id").references((): AnyPgColumn => directories.id, { onDelete: "cascade" }),
  name: t.varchar("name").notNull(),
  file_type: fileType().notNull(),
  createdAt: t.timestamp("created_at").defaultNow(),
  updatedAt: t.timestamp("updated_at").defaultNow(),
}, (pgTable) => [
  t.index("files_directory_id_idx").on(pgTable.directory_id),
  t.index("files_name_idx").on(pgTable.name),
  t.unique("files_name_directory_id_unique_idx").on(pgTable.name, pgTable.directory_id, pgTable.file_type),
]);
