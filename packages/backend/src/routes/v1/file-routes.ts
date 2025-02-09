import { Elysia } from "elysia";
import File from "../../models/file-model";

export const fileRoutes = new Elysia().group("/api/v1", (app) =>
  app
    .get("/files/:directory_id", async ({params}) => {
      try {
        const files = await File.getByDirectoryId(Number(params.directory_id));
        return files;
      } catch (error) {
        return new Response(
          JSON.stringify({
            error: "Failed to fetch files",
            details: error instanceof Error ? error.message : String(error),
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    })
    .post("/files", async ({ body }) => {
      try {
        const newFile = await File.create(body);
        return newFile;
      } catch (error) {
        return new Response(
          JSON.stringify({
            error: "Failed to create file",
            details: error instanceof Error ? error.message : String(error),
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    })
);
