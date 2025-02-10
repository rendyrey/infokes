import { z } from "zod";
import Directory from "../directory-model";
import { ValidationError } from "../../errors/ValidationError";
import * as errorHelper from "./helper";

export const directorySchema = z.object({
  name: z.string().min(1, "Directory name is required"),
  parent_id: z.union([z.number(), z.null()]).optional(),
});

export async function validateCreateDirectory(data: any) {
  try {
    const parsedData = directorySchema.parse(data);

    const existingDirectory = await Directory.getOneByNameAndParentId(parsedData.name, parsedData.parent_id);
    if (existingDirectory) {
      throw new ValidationError("Directory with the same name already exists");
    }

    return parsedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = errorHelper.errorMessagesFromZodError(error);
      throw new ValidationError(errorMessage);
    }

    throw error;
  }
}

