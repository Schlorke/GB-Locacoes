import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => CategoryWhereInputObjectSchema).optional()
}).strict();
export const CategoryScalarRelationFilterObjectSchema: z.ZodType<Prisma.CategoryScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CategoryScalarRelationFilter>;
export const CategoryScalarRelationFilterObjectZodSchema = makeSchema();
