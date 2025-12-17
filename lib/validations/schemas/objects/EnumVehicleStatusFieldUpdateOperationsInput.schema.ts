import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { VehicleStatusSchema } from '../enums/VehicleStatus.schema'

const makeSchema = () => z.object({
  set: VehicleStatusSchema.optional()
}).strict();
export const EnumVehicleStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumVehicleStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumVehicleStatusFieldUpdateOperationsInput>;
export const EnumVehicleStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
