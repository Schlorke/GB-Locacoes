import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CategoryCreateManyInputObjectSchema as CategoryCreateManyInputObjectSchema } from './objects/CategoryCreateManyInput.schema';

export const CategoryCreateManySchema: z.ZodType<Prisma.CategoryCreateManyArgs> = z.object({ data: z.union([ CategoryCreateManyInputObjectSchema, z.array(CategoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CategoryCreateManyArgs>;

export const CategoryCreateManyZodSchema = z.object({ data: z.union([ CategoryCreateManyInputObjectSchema, z.array(CategoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();