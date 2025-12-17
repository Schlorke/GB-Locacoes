import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUnitStatusSchema } from '../enums/EquipmentUnitStatus.schema'

const makeSchema = () => z.object({
  set: EquipmentUnitStatusSchema.optional()
}).strict();
export const EnumEquipmentUnitStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumEquipmentUnitStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumEquipmentUnitStatusFieldUpdateOperationsInput>;
export const EnumEquipmentUnitStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
