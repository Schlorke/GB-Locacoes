import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceTypeSchema } from '../enums/MaintenanceType.schema'

const makeSchema = () => z.object({
  set: MaintenanceTypeSchema.optional()
}).strict();
export const EnumMaintenanceTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumMaintenanceTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumMaintenanceTypeFieldUpdateOperationsInput>;
export const EnumMaintenanceTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
