import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CategorySelectObjectSchema as CategorySelectObjectSchema } from './objects/CategorySelect.schema';
import { CategoryIncludeObjectSchema as CategoryIncludeObjectSchema } from './objects/CategoryInclude.schema';
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './objects/CategoryWhereUniqueInput.schema';

export const CategoryDeleteOneSchema: z.ZodType<Prisma.CategoryDeleteArgs> = z.object({ select: CategorySelectObjectSchema.optional(), include: CategoryIncludeObjectSchema.optional(), where: CategoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CategoryDeleteArgs>;

export const CategoryDeleteOneZodSchema = z.object({ select: CategorySelectObjectSchema.optional(), include: CategoryIncludeObjectSchema.optional(), where: CategoryWhereUniqueInputObjectSchema }).strict();