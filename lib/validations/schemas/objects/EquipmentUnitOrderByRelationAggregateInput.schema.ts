/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const EquipmentUnitOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentUnitOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitOrderByRelationAggregateInput>;
export const EquipmentUnitOrderByRelationAggregateInputObjectZodSchema = makeSchema();
