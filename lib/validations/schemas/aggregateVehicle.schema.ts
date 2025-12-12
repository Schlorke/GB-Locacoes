/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VehicleOrderByWithRelationInputObjectSchema as VehicleOrderByWithRelationInputObjectSchema } from './objects/VehicleOrderByWithRelationInput.schema';
import { VehicleWhereInputObjectSchema as VehicleWhereInputObjectSchema } from './objects/VehicleWhereInput.schema';
import { VehicleWhereUniqueInputObjectSchema as VehicleWhereUniqueInputObjectSchema } from './objects/VehicleWhereUniqueInput.schema';
import { VehicleCountAggregateInputObjectSchema as VehicleCountAggregateInputObjectSchema } from './objects/VehicleCountAggregateInput.schema';
import { VehicleMinAggregateInputObjectSchema as VehicleMinAggregateInputObjectSchema } from './objects/VehicleMinAggregateInput.schema';
import { VehicleMaxAggregateInputObjectSchema as VehicleMaxAggregateInputObjectSchema } from './objects/VehicleMaxAggregateInput.schema';
import { VehicleAvgAggregateInputObjectSchema as VehicleAvgAggregateInputObjectSchema } from './objects/VehicleAvgAggregateInput.schema';
import { VehicleSumAggregateInputObjectSchema as VehicleSumAggregateInputObjectSchema } from './objects/VehicleSumAggregateInput.schema';

export const VehicleAggregateSchema: z.ZodType<Prisma.VehicleAggregateArgs> = z.object({ orderBy: z.union([VehicleOrderByWithRelationInputObjectSchema, VehicleOrderByWithRelationInputObjectSchema.array()]).optional(), where: VehicleWhereInputObjectSchema.optional(), cursor: VehicleWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), VehicleCountAggregateInputObjectSchema ]).optional(), _min: VehicleMinAggregateInputObjectSchema.optional(), _max: VehicleMaxAggregateInputObjectSchema.optional(), _avg: VehicleAvgAggregateInputObjectSchema.optional(), _sum: VehicleSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.VehicleAggregateArgs>;

export const VehicleAggregateZodSchema = z.object({ orderBy: z.union([VehicleOrderByWithRelationInputObjectSchema, VehicleOrderByWithRelationInputObjectSchema.array()]).optional(), where: VehicleWhereInputObjectSchema.optional(), cursor: VehicleWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), VehicleCountAggregateInputObjectSchema ]).optional(), _min: VehicleMinAggregateInputObjectSchema.optional(), _max: VehicleMaxAggregateInputObjectSchema.optional(), _avg: VehicleAvgAggregateInputObjectSchema.optional(), _sum: VehicleSumAggregateInputObjectSchema.optional() }).strict();