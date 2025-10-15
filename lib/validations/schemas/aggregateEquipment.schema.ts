/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentOrderByWithRelationInputObjectSchema as EquipmentOrderByWithRelationInputObjectSchema } from './objects/EquipmentOrderByWithRelationInput.schema';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema';
import { EquipmentCountAggregateInputObjectSchema as EquipmentCountAggregateInputObjectSchema } from './objects/EquipmentCountAggregateInput.schema';
import { EquipmentMinAggregateInputObjectSchema as EquipmentMinAggregateInputObjectSchema } from './objects/EquipmentMinAggregateInput.schema';
import { EquipmentMaxAggregateInputObjectSchema as EquipmentMaxAggregateInputObjectSchema } from './objects/EquipmentMaxAggregateInput.schema';
import { EquipmentAvgAggregateInputObjectSchema as EquipmentAvgAggregateInputObjectSchema } from './objects/EquipmentAvgAggregateInput.schema';
import { EquipmentSumAggregateInputObjectSchema as EquipmentSumAggregateInputObjectSchema } from './objects/EquipmentSumAggregateInput.schema';

export const EquipmentAggregateSchema: z.ZodType<Prisma.EquipmentAggregateArgs> = z.object({ orderBy: z.union([EquipmentOrderByWithRelationInputObjectSchema, EquipmentOrderByWithRelationInputObjectSchema.array()]).optional(), where: EquipmentWhereInputObjectSchema.optional(), cursor: EquipmentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), EquipmentCountAggregateInputObjectSchema ]).optional(), _min: EquipmentMinAggregateInputObjectSchema.optional(), _max: EquipmentMaxAggregateInputObjectSchema.optional(), _avg: EquipmentAvgAggregateInputObjectSchema.optional(), _sum: EquipmentSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EquipmentAggregateArgs>;

export const EquipmentAggregateZodSchema = z.object({ orderBy: z.union([EquipmentOrderByWithRelationInputObjectSchema, EquipmentOrderByWithRelationInputObjectSchema.array()]).optional(), where: EquipmentWhereInputObjectSchema.optional(), cursor: EquipmentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), EquipmentCountAggregateInputObjectSchema ]).optional(), _min: EquipmentMinAggregateInputObjectSchema.optional(), _max: EquipmentMaxAggregateInputObjectSchema.optional(), _avg: EquipmentAvgAggregateInputObjectSchema.optional(), _sum: EquipmentSumAggregateInputObjectSchema.optional() }).strict();