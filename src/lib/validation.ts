import { z } from 'zod';

// TODO zod schema
export const TodoTitleSchema = z
  .string()
  .trim()
  .min(1, "Title must not be empty")
  .max(255, "Title must be at most 255 characters");
