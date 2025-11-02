import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CategorySelectObjectSchema as CategorySelectObjectSchema } from './objects/CategorySelect.schema';
import { CategoryIncludeObjectSchema as CategoryIncludeObjectSchema } from './objects/CategoryInclude.schema';
import { CategoryUpdateInputObjectSchema as CategoryUpdateInputObjectSchema } from './objects/CategoryUpdateInput.schema';
import { CategoryUncheckedUpdateInputObjectSchema as CategoryUncheckedUpdateInputObjectSchema } from './objects/CategoryUncheckedUpdateInput.schema';
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './objects/CategoryWhereUniqueInput.schema';

export const CategoryUpdateOneSchema: z.ZodType<Prisma.CategoryUpdateArgs> = z.object({ select: CategorySelectObjectSchema.optional(), include: CategoryIncludeObjectSchema.optional(), data: z.union([CategoryUpdateInputObjectSchema, CategoryUncheckedUpdateInputObjectSchema]), where: CategoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CategoryUpdateArgs>;

export const CategoryUpdateOneZodSchema = z.object({ select: CategorySelectObjectSchema.optional(), include: CategoryIncludeObjectSchema.optional(), data: z.union([CategoryUpdateInputObjectSchema, CategoryUncheckedUpdateInputObjectSchema]), where: CategoryWhereUniqueInputObjectSchema }).strict();