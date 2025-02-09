import { Elysia } from "elysia";
import File, { type FileType } from "../../models/file-model";
import { successResponse, errorResponse } from "../../helpers/response";

export const fileRoutes = new Elysia().group("/api/v1", (app) =>
  app
    .get("/files/:directory_id", async ({params}) => {
      try {
        const files = await File.getByDirectoryId(Number(params.directory_id));
        return files;
      } catch (error) {
        return errorResponse("Failed to fetch files", 500, error);
      }
    })
    .post("/files", async ({ body }: { body: FileType }) => {
      try {
        const existingFile = await File.getOneByNameAndDirectoryId(body.name, body.directory_id);

        if (existingFile) {
          return errorResponse("File already exists", 400);
        }

        const newFile = await File.create(body);
        return successResponse(newFile, "File created successfully", 201);
      } catch (error) {
        return errorResponse("Failed to create file", 500, error);
      }
    })
);
