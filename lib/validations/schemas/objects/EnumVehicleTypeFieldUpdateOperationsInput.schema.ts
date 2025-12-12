/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { VehicleTypeSchema } from '../enums/VehicleType.schema'

const makeSchema = () => z.object({
  set: VehicleTypeSchema.optional()
}).strict();
export const EnumVehicleTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumVehicleTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumVehicleTypeFieldUpdateOperationsInput>;
export const EnumVehicleTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
