import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceStatusSchema } from '../enums/MaintenanceStatus.schema'

const makeSchema = () => z.object({
  set: MaintenanceStatusSchema.optional()
}).strict();
export const EnumMaintenanceStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumMaintenanceStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumMaintenanceStatusFieldUpdateOperationsInput>;
export const EnumMaintenanceStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
