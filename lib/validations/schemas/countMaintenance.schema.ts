/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaintenanceOrderByWithRelationInputObjectSchema as MaintenanceOrderByWithRelationInputObjectSchema } from './objects/MaintenanceOrderByWithRelationInput.schema';
import { MaintenanceWhereInputObjectSchema as MaintenanceWhereInputObjectSchema } from './objects/MaintenanceWhereInput.schema';
import { MaintenanceWhereUniqueInputObjectSchema as MaintenanceWhereUniqueInputObjectSchema } from './objects/MaintenanceWhereUniqueInput.schema';
import { MaintenanceCountAggregateInputObjectSchema as MaintenanceCountAggregateInputObjectSchema } from './objects/MaintenanceCountAggregateInput.schema';

export const MaintenanceCountSchema: z.ZodType<Prisma.MaintenanceCountArgs> = z.object({ orderBy: z.union([MaintenanceOrderByWithRelationInputObjectSchema, MaintenanceOrderByWithRelationInputObjectSchema.array()]).optional(), where: MaintenanceWhereInputObjectSchema.optional(), cursor: MaintenanceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), MaintenanceCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.MaintenanceCountArgs>;

export const MaintenanceCountZodSchema = z.object({ orderBy: z.union([MaintenanceOrderByWithRelationInputObjectSchema, MaintenanceOrderByWithRelationInputObjectSchema.array()]).optional(), where: MaintenanceWhereInputObjectSchema.optional(), cursor: MaintenanceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), MaintenanceCountAggregateInputObjectSchema ]).optional() }).strict();