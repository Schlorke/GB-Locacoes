import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentUnitOrderByWithRelationInputObjectSchema as EquipmentUnitOrderByWithRelationInputObjectSchema } from './objects/EquipmentUnitOrderByWithRelationInput.schema';
import { EquipmentUnitWhereInputObjectSchema as EquipmentUnitWhereInputObjectSchema } from './objects/EquipmentUnitWhereInput.schema';
import { EquipmentUnitWhereUniqueInputObjectSchema as EquipmentUnitWhereUniqueInputObjectSchema } from './objects/EquipmentUnitWhereUniqueInput.schema';
import { EquipmentUnitCountAggregateInputObjectSchema as EquipmentUnitCountAggregateInputObjectSchema } from './objects/EquipmentUnitCountAggregateInput.schema';

export const EquipmentUnitCountSchema: z.ZodType<Prisma.EquipmentUnitCountArgs> = z.object({ orderBy: z.union([EquipmentUnitOrderByWithRelationInputObjectSchema, EquipmentUnitOrderByWithRelationInputObjectSchema.array()]).optional(), where: EquipmentUnitWhereInputObjectSchema.optional(), cursor: EquipmentUnitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), EquipmentUnitCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.EquipmentUnitCountArgs>;

export const EquipmentUnitCountZodSchema = z.object({ orderBy: z.union([EquipmentUnitOrderByWithRelationInputObjectSchema, EquipmentUnitOrderByWithRelationInputObjectSchema.array()]).optional(), where: EquipmentUnitWhereInputObjectSchema.optional(), cursor: EquipmentUnitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), EquipmentUnitCountAggregateInputObjectSchema ]).optional() }).strict();