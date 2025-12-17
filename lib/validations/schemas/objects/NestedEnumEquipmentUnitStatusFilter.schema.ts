/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUnitStatusSchema } from '../enums/EquipmentUnitStatus.schema'

const nestedenumequipmentunitstatusfilterSchema = z.object({
  equals: EquipmentUnitStatusSchema.optional(),
  in: EquipmentUnitStatusSchema.array().optional(),
  notIn: EquipmentUnitStatusSchema.array().optional(),
  not: z.union([EquipmentUnitStatusSchema, z.lazy(() => NestedEnumEquipmentUnitStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumEquipmentUnitStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumEquipmentUnitStatusFilter> = nestedenumequipmentunitstatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumEquipmentUnitStatusFilter>;
export const NestedEnumEquipmentUnitStatusFilterObjectZodSchema = nestedenumequipmentunitstatusfilterSchema;
