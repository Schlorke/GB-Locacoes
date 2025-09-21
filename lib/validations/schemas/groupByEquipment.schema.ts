import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema';
import { EquipmentOrderByWithAggregationInputObjectSchema } from './objects/EquipmentOrderByWithAggregationInput.schema';
import { EquipmentScalarWhereWithAggregatesInputObjectSchema } from './objects/EquipmentScalarWhereWithAggregatesInput.schema';
import { EquipmentScalarFieldEnumSchema } from './enums/EquipmentScalarFieldEnum.schema';
import { EquipmentCountAggregateInputObjectSchema } from './objects/EquipmentCountAggregateInput.schema';
import { EquipmentMinAggregateInputObjectSchema } from './objects/EquipmentMinAggregateInput.schema';
import { EquipmentMaxAggregateInputObjectSchema } from './objects/EquipmentMaxAggregateInput.schema';
import { EquipmentAvgAggregateInputObjectSchema } from './objects/EquipmentAvgAggregateInput.schema';
import { EquipmentSumAggregateInputObjectSchema } from './objects/EquipmentSumAggregateInput.schema';

export const EquipmentGroupBySchema: z.ZodType<Prisma.EquipmentGroupByArgs> = z.object({ where: EquipmentWhereInputObjectSchema.optional(), orderBy: z.union([EquipmentOrderByWithAggregationInputObjectSchema, EquipmentOrderByWithAggregationInputObjectSchema.array()]).optional(), having: EquipmentScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(EquipmentScalarFieldEnumSchema), _count: z.union([ z.literal(true), EquipmentCountAggregateInputObjectSchema ]).optional(), _min: EquipmentMinAggregateInputObjectSchema.optional(), _max: EquipmentMaxAggregateInputObjectSchema.optional(), _avg: EquipmentAvgAggregateInputObjectSchema.optional(), _sum: EquipmentSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EquipmentGroupByArgs>;

export const EquipmentGroupByZodSchema = z.object({ where: EquipmentWhereInputObjectSchema.optional(), orderBy: z.union([EquipmentOrderByWithAggregationInputObjectSchema, EquipmentOrderByWithAggregationInputObjectSchema.array()]).optional(), having: EquipmentScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(EquipmentScalarFieldEnumSchema), _count: z.union([ z.literal(true), EquipmentCountAggregateInputObjectSchema ]).optional(), _min: EquipmentMinAggregateInputObjectSchema.optional(), _max: EquipmentMaxAggregateInputObjectSchema.optional(), _avg: EquipmentAvgAggregateInputObjectSchema.optional(), _sum: EquipmentSumAggregateInputObjectSchema.optional() }).strict();