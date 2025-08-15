import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema'

export const CategoryScalarRelationFilterObjectSchema: z.ZodType<Prisma.CategoryScalarRelationFilter, Prisma.CategoryScalarRelationFilter> = z.object({
  is: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => CategoryWhereInputObjectSchema).optional()
}).strict();
export const CategoryScalarRelationFilterObjectZodSchema = z.object({
  is: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => CategoryWhereInputObjectSchema).optional()
}).strict();
