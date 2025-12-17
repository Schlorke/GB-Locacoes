/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceCreateManyEquipmentInputObjectSchema as MaintenanceCreateManyEquipmentInputObjectSchema } from './MaintenanceCreateManyEquipmentInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => MaintenanceCreateManyEquipmentInputObjectSchema), z.lazy(() => MaintenanceCreateManyEquipmentInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const MaintenanceCreateManyEquipmentInputEnvelopeObjectSchema: z.ZodType<Prisma.MaintenanceCreateManyEquipmentInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceCreateManyEquipmentInputEnvelope>;
export const MaintenanceCreateManyEquipmentInputEnvelopeObjectZodSchema = makeSchema();
