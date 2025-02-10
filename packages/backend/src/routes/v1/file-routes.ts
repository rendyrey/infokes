import { Elysia } from "elysia";
import File, { type FileType } from "../../models/file-model";
import Directory from "../../models/directory-model";
import { successResponse, errorResponse } from "../../helpers/response";
import { validateCreateFile } from "../../models/validations/file";
import { ValidationError } from "../../errors/ValidationError";

export const fileRoutes = new Elysia().group("/api/v1", (app) =>
  app
    .get("/files/:directory_id", async ({ params }) => {
      try {
        const directory = await Directory.getOne(Number(params.directory_id));
        
        if (!directory) {
          return errorResponse("Directory not found", 404);
        }

        const files = await File.getByDirectoryId(Number(params.directory_id));
        return files;
      } catch (error) {
        return errorResponse("Failed to fetch files", 500, error);
      }
    })
    .post("/files", async ({ body }: { body: FileType }) => {
      try {
        const validatedFile = await validateCreateFile(body);

        const newFile = await File.create(validatedFile);
        return successResponse(newFile, "File created successfully", 201);
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          return errorResponse(error.message, 400, error);
        }
        return errorResponse("Internal Server Error", 500, error);
      }
    })
    .delete("/files/:id", async ({ params }) => {
      try {
        const file = await File.getOne(Number(params.id));
        
        if (!file) {
          return errorResponse("File not found", 404);
        }

        const deletedFile = await File.delete(Number(params.id));
        return successResponse(deletedFile, "File deleted successfully", 200);
      } catch (error) {
        return errorResponse("Failed to delete file", 500, error);
      }
    })
);
