/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUnitCreateManyEquipmentInputObjectSchema as EquipmentUnitCreateManyEquipmentInputObjectSchema } from './EquipmentUnitCreateManyEquipmentInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => EquipmentUnitCreateManyEquipmentInputObjectSchema), z.lazy(() => EquipmentUnitCreateManyEquipmentInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const EquipmentUnitCreateManyEquipmentInputEnvelopeObjectSchema: z.ZodType<Prisma.EquipmentUnitCreateManyEquipmentInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitCreateManyEquipmentInputEnvelope>;
export const EquipmentUnitCreateManyEquipmentInputEnvelopeObjectZodSchema = makeSchema();
