import { Elysia } from "elysia";
import Directory, { type DirectoryType } from "../../models/directory-model";
import { successResponse, errorResponse } from "../../helpers/response";
import { validateCreateDirectory } from "../../models/validations/directory";
import { ValidationError } from "../../errors/ValidationError";

export const directoryRoutes = new Elysia().group("/api/v1", (app) =>
  app
    .get("/directories", async () => {
      try {
        const directories = await Directory.getAll();
        return successResponse(directories, "Directories fetched successfully", 200);
      } catch (error) {
        return errorResponse("Failed to fetch directories", 500, error);
      }
    })
    .post("/directories", async ({ body }: { body: DirectoryType }) => {
      try {
        const validatedDirectory = await validateCreateDirectory(body);
        
        const newDirectory = await Directory.create(validatedDirectory);

        return successResponse(newDirectory, "Directory created successfully", 201);
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          return errorResponse(error.message, 400, error);
        }
        return errorResponse("Internal Server Error", 500, error);
      }
    })
    .delete("/directories/:id", async ({ params }) => {
      try {
        const directory = await Directory.getOne(Number(params.id));
        
        if (!directory) {
          return errorResponse("Directory not found", 404);
        }

        const deletedDirectory = await Directory.delete(Number(params.id));

        return successResponse(deletedDirectory, "Directory deleted successfully", 200);
      } catch (error) {
        return errorResponse("Failed to delete directory", 500, error);
      }
    })
);
