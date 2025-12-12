/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AuditLogWhereInputObjectSchema as AuditLogWhereInputObjectSchema } from './objects/AuditLogWhereInput.schema';
import { AuditLogOrderByWithAggregationInputObjectSchema as AuditLogOrderByWithAggregationInputObjectSchema } from './objects/AuditLogOrderByWithAggregationInput.schema';
import { AuditLogScalarWhereWithAggregatesInputObjectSchema as AuditLogScalarWhereWithAggregatesInputObjectSchema } from './objects/AuditLogScalarWhereWithAggregatesInput.schema';
import { AuditLogScalarFieldEnumSchema } from './enums/AuditLogScalarFieldEnum.schema';
import { AuditLogCountAggregateInputObjectSchema as AuditLogCountAggregateInputObjectSchema } from './objects/AuditLogCountAggregateInput.schema';
import { AuditLogMinAggregateInputObjectSchema as AuditLogMinAggregateInputObjectSchema } from './objects/AuditLogMinAggregateInput.schema';
import { AuditLogMaxAggregateInputObjectSchema as AuditLogMaxAggregateInputObjectSchema } from './objects/AuditLogMaxAggregateInput.schema';

export const AuditLogGroupBySchema: z.ZodType<Prisma.AuditLogGroupByArgs> = z.object({ where: AuditLogWhereInputObjectSchema.optional(), orderBy: z.union([AuditLogOrderByWithAggregationInputObjectSchema, AuditLogOrderByWithAggregationInputObjectSchema.array()]).optional(), having: AuditLogScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(AuditLogScalarFieldEnumSchema), _count: z.union([ z.literal(true), AuditLogCountAggregateInputObjectSchema ]).optional(), _min: AuditLogMinAggregateInputObjectSchema.optional(), _max: AuditLogMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AuditLogGroupByArgs>;

export const AuditLogGroupByZodSchema = z.object({ where: AuditLogWhereInputObjectSchema.optional(), orderBy: z.union([AuditLogOrderByWithAggregationInputObjectSchema, AuditLogOrderByWithAggregationInputObjectSchema.array()]).optional(), having: AuditLogScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(AuditLogScalarFieldEnumSchema), _count: z.union([ z.literal(true), AuditLogCountAggregateInputObjectSchema ]).optional(), _min: AuditLogMinAggregateInputObjectSchema.optional(), _max: AuditLogMaxAggregateInputObjectSchema.optional() }).strict();