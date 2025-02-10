import { and, eq, isNull } from "drizzle-orm";
import db from "../db";
import { files } from "../db/schema";

export interface FileType {
  id: number;
  directory_id: number;
  name: string;
  file_type: string;
  createdAt: string;
  updatedAt: string;
}

const fileTypeEnum: readonly [string, ...string[]] = ["pdf", "docx", "txt", "jpg"];

const File = {
  async getAll() {
    try {
      const allFiles = await db.select().from(files);
      return allFiles;
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  },

  async getByDirectoryId(directory_id: number) {
    try {
      const filesInDirectory = await db.select().from(files).where(eq(files.directory_id, directory_id));
      return filesInDirectory;
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  },

  async getOne(id: number) {
    const directory = await db.select().from(files).where(eq(files.id, id));
    return directory[0];
  },

  async getOneByNameAndDirectoryId(name: string, directory_id: number | null) {
    const file = await db
      .select()
      .from(files)
      .where(and(eq(files.name, name), directory_id !== null ? eq(files.directory_id, directory_id) : isNull(files.directory_id)));
    return file[0];
  },

  async create(data: any) {
    const newDirectory = await db.insert(files).values(data).returning();
    return newDirectory[0];
  },

  async update(id: number, data: any) {
    const updatedDirectory = await db.update(files).set(data).where(eq(files.id, id)).returning();
    return updatedDirectory[0];
  },

  async delete(id: number) {
    const deletedDirectory = await db.delete(files).where(eq(files.id, id)).returning();
    return deletedDirectory[0];
  },
};

export default File;
export { fileTypeEnum };
