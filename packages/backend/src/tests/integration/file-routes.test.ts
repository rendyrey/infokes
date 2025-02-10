import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import db from "../../db";
import { files, directories } from "../../db/schema";
import { eq } from "drizzle-orm";
import './setupTest';

const base_url = `${process.env.BASE_URL}/api/v1`;

let firstDirectory: { id: number; name: string; parent_id: number | null } | null = null; // Declare globally

beforeAll(async () => {
  const result = await db
    .insert(directories)
    .values({
      name: "root",
      parent_id: null,
    })
    .returning();

  firstDirectory = result[0];
});

afterAll(async () => {
  await db.delete(files);
});

describe("File API Integration Tests", () => {
  it("should fetch all files in a directory", async () => {
    const insertedDirectory = await db
      .insert(directories)
      .values({
        name: "Test Directory",
        parent_id: null,
      })
      .returning();

    const directoryId = insertedDirectory[0].id;
    const response = await fetch(`${base_url}/files/${directoryId}`, {
      method: "GET",
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveLength(0);
  });

  it("should create a new file", async () => {
    const newFile = {
      name: "Test File",
      directory_id: firstDirectory!.id,
      file_type: "pdf" as "pdf" | "docx" | "txt" | "jpg",
    };

    const response = await fetch(`${base_url}/files`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFile),
    });

    expect(response.status).toBe(201); // Check HTTP response status

    const data = await response.json();
    const createdFile = data.data;
    expect(createdFile).toHaveProperty("id"); // Ensure ID is returned
    expect(createdFile.name).toBe(newFile.name); // Verify name is correct
    expect(createdFile.directory_id).toBe(newFile.directory_id);
    expect(createdFile.file_type).toBe(newFile.file_type);

    // Validate in database
    const dbEntry = await db.select().from(files).where(eq(files.id, createdFile.id));
    expect(dbEntry.length).toBe(1); // Ensure it was inserted
    expect(dbEntry[0].name).toBe(newFile.name);
    expect(dbEntry[0].directory_id).toBe(newFile.directory_id);
    expect(dbEntry[0].file_type).toBe(newFile.file_type);
  });

  it("should fail to create a new file with invalid data", async () => {
    const invalidFile = {
      name: "",
      directory_id: 1,
      file_type: "pdf",
    };

    const response = await fetch(`${base_url}/files`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidFile),
    });

    expect(response.status).toBe(400); // Check HTTP response status
  });

  it("should fail to create a new file with duplicate name", async () => {
    const file_name = "Test File Same Name";
    const duplicateFile = {
      name: file_name,
      directory_id: firstDirectory?.id,
      file_type: "pdf",
    };

    await db.insert(files).values({
      name: file_name,
      directory_id: firstDirectory?.id,
      file_type: "pdf",
    });

    const response = await fetch(`${base_url}/files`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(duplicateFile),
    });

    expect(response.status).toBe(400); // Check HTTP response status
  });

  it("should delete a file", async () => {
    const insertedFile = await db.insert(files).values({
      name: "File to Delete",
      directory_id: firstDirectory?.id,
      file_type: "pdf",
    }).returning();

    const fileId = insertedFile[0].id;

    const response = await fetch(`${base_url}/files/${fileId}`, {
      method: "DELETE",
    });

    expect(response.status).toBe(200); // Check HTTP response status
  });
});
