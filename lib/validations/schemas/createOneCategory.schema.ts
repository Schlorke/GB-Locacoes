import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CategorySelectObjectSchema as CategorySelectObjectSchema } from './objects/CategorySelect.schema';
import { CategoryIncludeObjectSchema as CategoryIncludeObjectSchema } from './objects/CategoryInclude.schema';
import { CategoryCreateInputObjectSchema as CategoryCreateInputObjectSchema } from './objects/CategoryCreateInput.schema';
import { CategoryUncheckedCreateInputObjectSchema as CategoryUncheckedCreateInputObjectSchema } from './objects/CategoryUncheckedCreateInput.schema';

export const CategoryCreateOneSchema: z.ZodType<Prisma.CategoryCreateArgs> = z.object({ select: CategorySelectObjectSchema.optional(), include: CategoryIncludeObjectSchema.optional(), data: z.union([CategoryCreateInputObjectSchema, CategoryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CategoryCreateArgs>;

export const CategoryCreateOneZodSchema = z.object({ select: CategorySelectObjectSchema.optional(), include: CategoryIncludeObjectSchema.optional(), data: z.union([CategoryCreateInputObjectSchema, CategoryUncheckedCreateInputObjectSchema]) }).strict();