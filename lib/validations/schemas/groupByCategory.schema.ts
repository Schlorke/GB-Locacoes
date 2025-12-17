import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CategoryWhereInputObjectSchema as CategoryWhereInputObjectSchema } from './objects/CategoryWhereInput.schema';
import { CategoryOrderByWithAggregationInputObjectSchema as CategoryOrderByWithAggregationInputObjectSchema } from './objects/CategoryOrderByWithAggregationInput.schema';
import { CategoryScalarWhereWithAggregatesInputObjectSchema as CategoryScalarWhereWithAggregatesInputObjectSchema } from './objects/CategoryScalarWhereWithAggregatesInput.schema';
import { CategoryScalarFieldEnumSchema } from './enums/CategoryScalarFieldEnum.schema';
import { CategoryCountAggregateInputObjectSchema as CategoryCountAggregateInputObjectSchema } from './objects/CategoryCountAggregateInput.schema';
import { CategoryMinAggregateInputObjectSchema as CategoryMinAggregateInputObjectSchema } from './objects/CategoryMinAggregateInput.schema';
import { CategoryMaxAggregateInputObjectSchema as CategoryMaxAggregateInputObjectSchema } from './objects/CategoryMaxAggregateInput.schema';

export const CategoryGroupBySchema: z.ZodType<Prisma.CategoryGroupByArgs> = z.object({ where: CategoryWhereInputObjectSchema.optional(), orderBy: z.union([CategoryOrderByWithAggregationInputObjectSchema, CategoryOrderByWithAggregationInputObjectSchema.array()]).optional(), having: CategoryScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(CategoryScalarFieldEnumSchema), _count: z.union([ z.literal(true), CategoryCountAggregateInputObjectSchema ]).optional(), _min: CategoryMinAggregateInputObjectSchema.optional(), _max: CategoryMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CategoryGroupByArgs>;

export const CategoryGroupByZodSchema = z.object({ where: CategoryWhereInputObjectSchema.optional(), orderBy: z.union([CategoryOrderByWithAggregationInputObjectSchema, CategoryOrderByWithAggregationInputObjectSchema.array()]).optional(), having: CategoryScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(CategoryScalarFieldEnumSchema), _count: z.union([ z.literal(true), CategoryCountAggregateInputObjectSchema ]).optional(), _min: CategoryMinAggregateInputObjectSchema.optional(), _max: CategoryMaxAggregateInputObjectSchema.optional() }).strict();