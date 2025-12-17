import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CategoryUpdateManyMutationInputObjectSchema as CategoryUpdateManyMutationInputObjectSchema } from './objects/CategoryUpdateManyMutationInput.schema';
import { CategoryWhereInputObjectSchema as CategoryWhereInputObjectSchema } from './objects/CategoryWhereInput.schema';

export const CategoryUpdateManySchema: z.ZodType<Prisma.CategoryUpdateManyArgs> = z.object({ data: CategoryUpdateManyMutationInputObjectSchema, where: CategoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CategoryUpdateManyArgs>;

export const CategoryUpdateManyZodSchema = z.object({ data: CategoryUpdateManyMutationInputObjectSchema, where: CategoryWhereInputObjectSchema.optional() }).strict();