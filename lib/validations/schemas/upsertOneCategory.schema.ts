import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CategorySelectObjectSchema as CategorySelectObjectSchema } from './objects/CategorySelect.schema';
import { CategoryIncludeObjectSchema as CategoryIncludeObjectSchema } from './objects/CategoryInclude.schema';
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './objects/CategoryWhereUniqueInput.schema';
import { CategoryCreateInputObjectSchema as CategoryCreateInputObjectSchema } from './objects/CategoryCreateInput.schema';
import { CategoryUncheckedCreateInputObjectSchema as CategoryUncheckedCreateInputObjectSchema } from './objects/CategoryUncheckedCreateInput.schema';
import { CategoryUpdateInputObjectSchema as CategoryUpdateInputObjectSchema } from './objects/CategoryUpdateInput.schema';
import { CategoryUncheckedUpdateInputObjectSchema as CategoryUncheckedUpdateInputObjectSchema } from './objects/CategoryUncheckedUpdateInput.schema';

export const CategoryUpsertOneSchema: z.ZodType<Prisma.CategoryUpsertArgs> = z.object({ select: CategorySelectObjectSchema.optional(), include: CategoryIncludeObjectSchema.optional(), where: CategoryWhereUniqueInputObjectSchema, create: z.union([ CategoryCreateInputObjectSchema, CategoryUncheckedCreateInputObjectSchema ]), update: z.union([ CategoryUpdateInputObjectSchema, CategoryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CategoryUpsertArgs>;

export const CategoryUpsertOneZodSchema = z.object({ select: CategorySelectObjectSchema.optional(), include: CategoryIncludeObjectSchema.optional(), where: CategoryWhereUniqueInputObjectSchema, create: z.union([ CategoryCreateInputObjectSchema, CategoryUncheckedCreateInputObjectSchema ]), update: z.union([ CategoryUpdateInputObjectSchema, CategoryUncheckedUpdateInputObjectSchema ]) }).strict();