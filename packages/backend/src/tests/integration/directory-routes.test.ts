import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import db from "../../db";
import { directories } from "../../db/schema";
import { eq } from "drizzle-orm";
import './setupTest';

const base_url = `${process.env.BASE_URL}/api/v1`;

beforeAll(async () => {
  await db.delete(directories);
  await db.insert(directories).values([
    {
      name: "root",
      parent_id: null,
    },
    {
      name: "rendy",
      parent_id: null,
    },
  ]);
});

afterAll(async () => {
  await db.delete(directories);
});

describe("Directory API Integration Tests", () => {
  it("should fetch all directories", async () => {
    const response = await fetch(`${base_url}/directories`);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.data).toHaveLength(2);
  });

  it("should create a new directory", async () => {
    const newDirectory = { name: "Test Directory", parent_id: null };

    const response = await fetch(`${base_url}/directories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDirectory),
    });

    expect(response.status).toBe(201); // Check HTTP response status

    const data = await response.json();
    const createdDirectory = data.data;
    expect(createdDirectory).toHaveProperty("id"); // Ensure ID is returned
    expect(createdDirectory.name).toBe(newDirectory.name); // Verify name is correct

    // Validate in database
    const dbEntry = await db.select().from(directories).where(eq(directories.id, createdDirectory.id));
    expect(dbEntry.length).toBe(1); // Ensure it was inserted
    expect(dbEntry[0].name).toBe(newDirectory.name);
  });

  it("should fail to create a new directory with invalid data", async () => {
    const invalidDirectory = { name: "", parent_id: null };

    const response = await fetch(`${base_url}/directories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidDirectory),
    });

    expect(response.status).toBe(400); // Check HTTP response status
  });

  it("should fail to create a new directory with duplicate name", async () => {
    const duplicateDirectory = { name: "root", parent_id: null };

    const response = await fetch(`${base_url}/directories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(duplicateDirectory),
    });

    expect(response.status).toBe(400); // Check HTTP response status
  });

  it("should delete a directory", async () => {
    const insertedDirectory = await db.insert(directories).values({
      name: "Directory to Delete",
      parent_id: null,
    }).returning();

    const response = await fetch(`${base_url}/directories/${insertedDirectory[0].id}`, {
      method: "DELETE",
    });
    expect(response.status).toBe(200);
  });
});
