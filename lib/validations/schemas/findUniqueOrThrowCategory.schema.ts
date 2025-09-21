import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CategorySelectObjectSchema } from './objects/CategorySelect.schema';
import { CategoryIncludeObjectSchema } from './objects/CategoryInclude.schema';
import { CategoryWhereUniqueInputObjectSchema } from './objects/CategoryWhereUniqueInput.schema';

export const CategoryFindUniqueOrThrowSchema: z.ZodType<Prisma.CategoryFindUniqueOrThrowArgs> = z.object({ select: CategorySelectObjectSchema.optional(), include: CategoryIncludeObjectSchema.optional(), where: CategoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CategoryFindUniqueOrThrowArgs>;

export const CategoryFindUniqueOrThrowZodSchema = z.object({ select: CategorySelectObjectSchema.optional(), include: CategoryIncludeObjectSchema.optional(), where: CategoryWhereUniqueInputObjectSchema }).strict();