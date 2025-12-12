/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AuditLogOrderByWithRelationInputObjectSchema as AuditLogOrderByWithRelationInputObjectSchema } from './objects/AuditLogOrderByWithRelationInput.schema';
import { AuditLogWhereInputObjectSchema as AuditLogWhereInputObjectSchema } from './objects/AuditLogWhereInput.schema';
import { AuditLogWhereUniqueInputObjectSchema as AuditLogWhereUniqueInputObjectSchema } from './objects/AuditLogWhereUniqueInput.schema';
import { AuditLogCountAggregateInputObjectSchema as AuditLogCountAggregateInputObjectSchema } from './objects/AuditLogCountAggregateInput.schema';
import { AuditLogMinAggregateInputObjectSchema as AuditLogMinAggregateInputObjectSchema } from './objects/AuditLogMinAggregateInput.schema';
import { AuditLogMaxAggregateInputObjectSchema as AuditLogMaxAggregateInputObjectSchema } from './objects/AuditLogMaxAggregateInput.schema';

export const AuditLogAggregateSchema: z.ZodType<Prisma.AuditLogAggregateArgs> = z.object({ orderBy: z.union([AuditLogOrderByWithRelationInputObjectSchema, AuditLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: AuditLogWhereInputObjectSchema.optional(), cursor: AuditLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), AuditLogCountAggregateInputObjectSchema ]).optional(), _min: AuditLogMinAggregateInputObjectSchema.optional(), _max: AuditLogMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AuditLogAggregateArgs>;

export const AuditLogAggregateZodSchema = z.object({ orderBy: z.union([AuditLogOrderByWithRelationInputObjectSchema, AuditLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: AuditLogWhereInputObjectSchema.optional(), cursor: AuditLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), AuditLogCountAggregateInputObjectSchema ]).optional(), _min: AuditLogMinAggregateInputObjectSchema.optional(), _max: AuditLogMaxAggregateInputObjectSchema.optional() }).strict();