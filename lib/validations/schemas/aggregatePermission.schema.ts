/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PermissionOrderByWithRelationInputObjectSchema as PermissionOrderByWithRelationInputObjectSchema } from './objects/PermissionOrderByWithRelationInput.schema';
import { PermissionWhereInputObjectSchema as PermissionWhereInputObjectSchema } from './objects/PermissionWhereInput.schema';
import { PermissionWhereUniqueInputObjectSchema as PermissionWhereUniqueInputObjectSchema } from './objects/PermissionWhereUniqueInput.schema';
import { PermissionCountAggregateInputObjectSchema as PermissionCountAggregateInputObjectSchema } from './objects/PermissionCountAggregateInput.schema';
import { PermissionMinAggregateInputObjectSchema as PermissionMinAggregateInputObjectSchema } from './objects/PermissionMinAggregateInput.schema';
import { PermissionMaxAggregateInputObjectSchema as PermissionMaxAggregateInputObjectSchema } from './objects/PermissionMaxAggregateInput.schema';

export const PermissionAggregateSchema: z.ZodType<Prisma.PermissionAggregateArgs> = z.object({ orderBy: z.union([PermissionOrderByWithRelationInputObjectSchema, PermissionOrderByWithRelationInputObjectSchema.array()]).optional(), where: PermissionWhereInputObjectSchema.optional(), cursor: PermissionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PermissionCountAggregateInputObjectSchema ]).optional(), _min: PermissionMinAggregateInputObjectSchema.optional(), _max: PermissionMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PermissionAggregateArgs>;

export const PermissionAggregateZodSchema = z.object({ orderBy: z.union([PermissionOrderByWithRelationInputObjectSchema, PermissionOrderByWithRelationInputObjectSchema.array()]).optional(), where: PermissionWhereInputObjectSchema.optional(), cursor: PermissionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PermissionCountAggregateInputObjectSchema ]).optional(), _min: PermissionMinAggregateInputObjectSchema.optional(), _max: PermissionMaxAggregateInputObjectSchema.optional() }).strict();