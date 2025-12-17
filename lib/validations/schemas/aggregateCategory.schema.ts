import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CategoryOrderByWithRelationInputObjectSchema as CategoryOrderByWithRelationInputObjectSchema } from './objects/CategoryOrderByWithRelationInput.schema';
import { CategoryWhereInputObjectSchema as CategoryWhereInputObjectSchema } from './objects/CategoryWhereInput.schema';
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './objects/CategoryWhereUniqueInput.schema';
import { CategoryCountAggregateInputObjectSchema as CategoryCountAggregateInputObjectSchema } from './objects/CategoryCountAggregateInput.schema';
import { CategoryMinAggregateInputObjectSchema as CategoryMinAggregateInputObjectSchema } from './objects/CategoryMinAggregateInput.schema';
import { CategoryMaxAggregateInputObjectSchema as CategoryMaxAggregateInputObjectSchema } from './objects/CategoryMaxAggregateInput.schema';

export const CategoryAggregateSchema: z.ZodType<Prisma.CategoryAggregateArgs> = z.object({ orderBy: z.union([CategoryOrderByWithRelationInputObjectSchema, CategoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: CategoryWhereInputObjectSchema.optional(), cursor: CategoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), CategoryCountAggregateInputObjectSchema ]).optional(), _min: CategoryMinAggregateInputObjectSchema.optional(), _max: CategoryMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CategoryAggregateArgs>;

export const CategoryAggregateZodSchema = z.object({ orderBy: z.union([CategoryOrderByWithRelationInputObjectSchema, CategoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: CategoryWhereInputObjectSchema.optional(), cursor: CategoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), CategoryCountAggregateInputObjectSchema ]).optional(), _min: CategoryMinAggregateInputObjectSchema.optional(), _max: CategoryMaxAggregateInputObjectSchema.optional() }).strict();