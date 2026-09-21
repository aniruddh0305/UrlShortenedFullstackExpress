import { z } from "zod";

const portSchema = z.coerce.number().min(1).max(65535).default(3001);

export const PORT = portSchema.parse(process.env.PORT);

export const MONGODB_URI = z.string().parse(process.env.MONGODB_URI);

export const MONGODB_DATABASE_NAME = z
  .string()
  .parse(process.env.MONGODB_DATABASE_NAME);
