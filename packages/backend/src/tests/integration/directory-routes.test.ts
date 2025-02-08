import { Elysia } from "elysia";
import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { directoryRoutes } from "../../routes/v1";
import db from "../../db";
import { directories } from "../../db/schema";
import { eq } from "drizzle-orm";

let server: Elysia;
const base_url = "http://localhost:3001/api/v1";

beforeAll(async () => {
  server = new Elysia().use(directoryRoutes).listen(3001);
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
  server.stop();
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
});
