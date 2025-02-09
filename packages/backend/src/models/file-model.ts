import { eq } from "drizzle-orm";
import db from "../db";
import { files } from "../db/schema";

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

  async getByDirectoryId(directoryId: number) {
    try {
      const filesInDirectory = await db.select().from(files).where(eq(files.directory_id, directoryId));
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
