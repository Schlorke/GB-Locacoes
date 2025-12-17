import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CategoryWhereInputObjectSchema as CategoryWhereInputObjectSchema } from './objects/CategoryWhereInput.schema';

export const CategoryDeleteManySchema: z.ZodType<Prisma.CategoryDeleteManyArgs> = z.object({ where: CategoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CategoryDeleteManyArgs>;

export const CategoryDeleteManyZodSchema = z.object({ where: CategoryWhereInputObjectSchema.optional() }).strict();