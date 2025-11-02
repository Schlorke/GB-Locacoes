import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CategorySelectObjectSchema as CategorySelectObjectSchema } from './objects/CategorySelect.schema';
import { CategoryUpdateManyMutationInputObjectSchema as CategoryUpdateManyMutationInputObjectSchema } from './objects/CategoryUpdateManyMutationInput.schema';
import { CategoryWhereInputObjectSchema as CategoryWhereInputObjectSchema } from './objects/CategoryWhereInput.schema';

export const CategoryUpdateManyAndReturnSchema: z.ZodType<Prisma.CategoryUpdateManyAndReturnArgs> = z.object({ select: CategorySelectObjectSchema.optional(), data: CategoryUpdateManyMutationInputObjectSchema, where: CategoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CategoryUpdateManyAndReturnArgs>;

export const CategoryUpdateManyAndReturnZodSchema = z.object({ select: CategorySelectObjectSchema.optional(), data: CategoryUpdateManyMutationInputObjectSchema, where: CategoryWhereInputObjectSchema.optional() }).strict();