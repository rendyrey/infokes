import db from "./index";
import { directories, files } from "./schema";
import { eq } from "drizzle-orm";

async function seedDirectories() {
  const directories_count = await db.$count(directories);

  if (directories_count > 0) {
    console.log("Database already seeded!");
    return;
  }
  console.log("Seeding database...");

  // await db.delete(directories);

  await db.insert(directories).values([
    {
      name: "root",
      parent_id: null,
    },
    {
      name: "rendy",
      parent_id: 1,
    },
    {
      name: "documents",
      parent_id: 1,
    },
    {
      name: "images",
      parent_id: 1,
    },
    {
      name: "music",
      parent_id: 1,
    },
  ]);

  console.log("Seeding directories completed!");


  // seed files
  const files_count = await db.$count(files);

  if (files_count > 0) {
    console.log("Database already seeded!");
    return;
  }
  console.log("Seeding database...");

  await db.delete(files);

  await db.insert(files).values([
    {
      name: "file1",
      directory_id: 1,
      file_type: 'pdf'
    },
    {
      name: "file2",
      directory_id: 1,
      file_type: 'jpg'
    },
    {
      name: "file3",
      directory_id: 1,
      file_type: 'docx'
    }
  ]);
}

seedDirectories().catch((err) => {
  console.log("Error seeding database", err);
  process.exit(1);
});