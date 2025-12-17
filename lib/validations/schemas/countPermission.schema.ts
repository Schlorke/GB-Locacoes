import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PermissionOrderByWithRelationInputObjectSchema as PermissionOrderByWithRelationInputObjectSchema } from './objects/PermissionOrderByWithRelationInput.schema';
import { PermissionWhereInputObjectSchema as PermissionWhereInputObjectSchema } from './objects/PermissionWhereInput.schema';
import { PermissionWhereUniqueInputObjectSchema as PermissionWhereUniqueInputObjectSchema } from './objects/PermissionWhereUniqueInput.schema';
import { PermissionCountAggregateInputObjectSchema as PermissionCountAggregateInputObjectSchema } from './objects/PermissionCountAggregateInput.schema';

export const PermissionCountSchema: z.ZodType<Prisma.PermissionCountArgs> = z.object({ orderBy: z.union([PermissionOrderByWithRelationInputObjectSchema, PermissionOrderByWithRelationInputObjectSchema.array()]).optional(), where: PermissionWhereInputObjectSchema.optional(), cursor: PermissionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PermissionCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.PermissionCountArgs>;

export const PermissionCountZodSchema = z.object({ orderBy: z.union([PermissionOrderByWithRelationInputObjectSchema, PermissionOrderByWithRelationInputObjectSchema.array()]).optional(), where: PermissionWhereInputObjectSchema.optional(), cursor: PermissionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PermissionCountAggregateInputObjectSchema ]).optional() }).strict();