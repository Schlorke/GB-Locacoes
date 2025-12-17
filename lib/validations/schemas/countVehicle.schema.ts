import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VehicleOrderByWithRelationInputObjectSchema as VehicleOrderByWithRelationInputObjectSchema } from './objects/VehicleOrderByWithRelationInput.schema';
import { VehicleWhereInputObjectSchema as VehicleWhereInputObjectSchema } from './objects/VehicleWhereInput.schema';
import { VehicleWhereUniqueInputObjectSchema as VehicleWhereUniqueInputObjectSchema } from './objects/VehicleWhereUniqueInput.schema';
import { VehicleCountAggregateInputObjectSchema as VehicleCountAggregateInputObjectSchema } from './objects/VehicleCountAggregateInput.schema';

export const VehicleCountSchema: z.ZodType<Prisma.VehicleCountArgs> = z.object({ orderBy: z.union([VehicleOrderByWithRelationInputObjectSchema, VehicleOrderByWithRelationInputObjectSchema.array()]).optional(), where: VehicleWhereInputObjectSchema.optional(), cursor: VehicleWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), VehicleCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.VehicleCountArgs>;

export const VehicleCountZodSchema = z.object({ orderBy: z.union([VehicleOrderByWithRelationInputObjectSchema, VehicleOrderByWithRelationInputObjectSchema.array()]).optional(), where: VehicleWhereInputObjectSchema.optional(), cursor: VehicleWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), VehicleCountAggregateInputObjectSchema ]).optional() }).strict();