/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { VehicleTypeSchema } from '../enums/VehicleType.schema';
import { EnumVehicleTypeFieldUpdateOperationsInputObjectSchema as EnumVehicleTypeFieldUpdateOperationsInputObjectSchema } from './EnumVehicleTypeFieldUpdateOperationsInput.schema';
import { VehicleStatusSchema } from '../enums/VehicleStatus.schema';
import { EnumVehicleStatusFieldUpdateOperationsInputObjectSchema as EnumVehicleStatusFieldUpdateOperationsInputObjectSchema } from './EnumVehicleStatusFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  plate: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  brand: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  model: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  year: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  type: z.union([VehicleTypeSchema, z.lazy(() => EnumVehicleTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([VehicleStatusSchema, z.lazy(() => EnumVehicleStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const VehicleUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.VehicleUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.VehicleUncheckedUpdateInput>;
export const VehicleUncheckedUpdateInputObjectZodSchema = makeSchema();
