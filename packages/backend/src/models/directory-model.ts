import { eq, and, isNull } from "drizzle-orm";
import db from "../db";
import { directories } from "../db/schema";

export interface DirectoryType {
  id: number;
  name: string;
  parent_id: number;
  createdAt: string;
  updatedAt: string;
}

const Directory = {
  async getAll() {
    try {
      const allDirectories = await db.select().from(directories);
      return allDirectories;
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  },

  async getOne(id: number) {
    const directory = await db.select().from(directories).where(eq(directories.id, id));
    return directory[0];
  },

  async getOneByNameAndParentId(name: string, parent_id: any) {
    const directory = await db
      .select()
      .from(directories)
      .where(
        and(
          eq(directories.name, name),
          parent_id !== null ? eq(directories.parent_id, parent_id) : isNull(directories.parent_id)
        )
      );
    return directory[0];
  },

  async create(data: any) {
    const newDirectory = await db.insert(directories).values(data).returning();
    return newDirectory[0];
  },

  async update(id: number, data: any) {
    const updatedDirectory = await db.update(directories).set(data).where(eq(directories.id, id)).returning();
    return updatedDirectory[0];
  },

  async delete(id: number) {
    const deletedDirectory = await db.delete(directories).where(eq(directories.id, id)).returning();
    return deletedDirectory[0];
  },
};

export default Directory;
