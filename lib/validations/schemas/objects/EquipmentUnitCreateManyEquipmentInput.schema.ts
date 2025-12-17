import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { EquipmentUnitStatusSchema } from '../enums/EquipmentUnitStatus.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  uniqueCode: z.string(),
  status: EquipmentUnitStatusSchema.optional(),
  hourMeter: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'hourMeter' must be a Decimal",
}).optional().nullable(),
  odometer: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'odometer' must be a Decimal",
}).optional().nullable(),
  serialNumber: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const EquipmentUnitCreateManyEquipmentInputObjectSchema: z.ZodType<Prisma.EquipmentUnitCreateManyEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitCreateManyEquipmentInput>;
export const EquipmentUnitCreateManyEquipmentInputObjectZodSchema = makeSchema();
