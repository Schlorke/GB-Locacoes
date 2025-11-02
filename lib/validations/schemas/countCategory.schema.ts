import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CategoryOrderByWithRelationInputObjectSchema as CategoryOrderByWithRelationInputObjectSchema } from './objects/CategoryOrderByWithRelationInput.schema';
import { CategoryWhereInputObjectSchema as CategoryWhereInputObjectSchema } from './objects/CategoryWhereInput.schema';
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './objects/CategoryWhereUniqueInput.schema';
import { CategoryCountAggregateInputObjectSchema as CategoryCountAggregateInputObjectSchema } from './objects/CategoryCountAggregateInput.schema';

export const CategoryCountSchema: z.ZodType<Prisma.CategoryCountArgs> = z.object({ orderBy: z.union([CategoryOrderByWithRelationInputObjectSchema, CategoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: CategoryWhereInputObjectSchema.optional(), cursor: CategoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CategoryCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CategoryCountArgs>;

export const CategoryCountZodSchema = z.object({ orderBy: z.union([CategoryOrderByWithRelationInputObjectSchema, CategoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: CategoryWhereInputObjectSchema.optional(), cursor: CategoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CategoryCountAggregateInputObjectSchema ]).optional() }).strict();