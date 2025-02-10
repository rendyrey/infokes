import { z } from "zod";
import File, { fileTypeEnum } from "../file-model";
import { ValidationError } from "../../errors/ValidationError";
import * as errorHelper from "./helper";
import { file } from "bun";

export const fileSchema = z.object({
  name: z.string().min(1, "File name is required"),
  directory_id: z.union([z.number(), z.null()]),
  file_type: z.enum(fileTypeEnum),
});

export async function validateCreateFile(data: any) {
  try {
    const parsedData = fileSchema.parse(data);
    const existingFile = await File.getOneByNameAndDirectoryId(parsedData.name, parsedData.directory_id);
    if (existingFile) {
      throw new ValidationError("File with the same name already exists");
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
