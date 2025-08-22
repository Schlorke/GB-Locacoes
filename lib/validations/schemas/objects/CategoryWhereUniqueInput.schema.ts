import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const CategoryWhereUniqueInputObjectSchema: z.ZodType<Prisma.CategoryWhereUniqueInput, Prisma.CategoryWhereUniqueInput> = z.object({
  id: z.string(),
  slug: z.string()
}).strict();
export const CategoryWhereUniqueInputObjectZodSchema = z.object({
  id: z.string(),
  slug: z.string()
}).strict();
