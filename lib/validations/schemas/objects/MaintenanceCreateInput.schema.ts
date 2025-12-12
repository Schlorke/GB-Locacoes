/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { MaintenanceTypeSchema } from '../enums/MaintenanceType.schema';
import { MaintenanceStatusSchema } from '../enums/MaintenanceStatus.schema';
import { EquipmentCreateNestedOneWithoutMaintenancesInputObjectSchema as EquipmentCreateNestedOneWithoutMaintenancesInputObjectSchema } from './EquipmentCreateNestedOneWithoutMaintenancesInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  type: MaintenanceTypeSchema,
  scheduledAt: z.coerce.date(),
  completedAt: z.coerce.date().optional().nullable(),
  cost: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'cost' must be a Decimal",
}).optional().nullable(),
  laborCost: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'laborCost' must be a Decimal",
}).optional().nullable(),
  partsCost: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'partsCost' must be a Decimal",
}).optional().nullable(),
  description: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  technician: z.string().optional().nullable(),
  status: MaintenanceStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  equipment: z.lazy(() => EquipmentCreateNestedOneWithoutMaintenancesInputObjectSchema)
}).strict();
export const MaintenanceCreateInputObjectSchema: z.ZodType<Prisma.MaintenanceCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceCreateInput>;
export const MaintenanceCreateInputObjectZodSchema = makeSchema();
