import { z } from 'zod';
import { EquipmentOrderByWithRelationInputObjectSchema } from './objects/EquipmentOrderByWithRelationInput.schema';
import { EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema';
import { EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema';
import { EquipmentCountAggregateInputObjectSchema } from './objects/EquipmentCountAggregateInput.schema';
import { EquipmentMinAggregateInputObjectSchema } from './objects/EquipmentMinAggregateInput.schema';
import { EquipmentMaxAggregateInputObjectSchema } from './objects/EquipmentMaxAggregateInput.schema';
import { EquipmentAvgAggregateInputObjectSchema } from './objects/EquipmentAvgAggregateInput.schema';
import { EquipmentSumAggregateInputObjectSchema } from './objects/EquipmentSumAggregateInput.schema';

export const EquipmentAggregateSchema = z.object({ orderBy: z.union([EquipmentOrderByWithRelationInputObjectSchema, EquipmentOrderByWithRelationInputObjectSchema.array()]).optional(), where: EquipmentWhereInputObjectSchema.optional(), cursor: EquipmentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), EquipmentCountAggregateInputObjectSchema ]).optional(), _min: EquipmentMinAggregateInputObjectSchema.optional(), _max: EquipmentMaxAggregateInputObjectSchema.optional(), _avg: EquipmentAvgAggregateInputObjectSchema.optional(), _sum: EquipmentSumAggregateInputObjectSchema.optional() })