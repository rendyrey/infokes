import { Elysia } from "elysia";
import Directory from "../../models/directory-model";
import { successResponse, errorResponse } from "../../helpers/response";

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
    .post("/directories", async ({ body }) => {
      try {
        const newDirectory = await Directory.create(body);

        return successResponse(newDirectory, "Directory created successfully", 201);
      } catch (error) {
        return errorResponse("Failed to create directory", 500, error);
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
