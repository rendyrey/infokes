import { z } from "zod";

export const errorMessagesFromZodError = (error: z.ZodError) => error.errors.map((err) => err.message).join(", ");