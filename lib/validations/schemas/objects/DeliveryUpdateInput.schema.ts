/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema';
import { EnumDeliveryTypeFieldUpdateOperationsInputObjectSchema as EnumDeliveryTypeFieldUpdateOperationsInputObjectSchema } from './EnumDeliveryTypeFieldUpdateOperationsInput.schema';
import { DeliveryStatusSchema } from '../enums/DeliveryStatus.schema';
import { EnumDeliveryStatusFieldUpdateOperationsInputObjectSchema as EnumDeliveryStatusFieldUpdateOperationsInputObjectSchema } from './EnumDeliveryStatusFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DeliveryUpdatephotosInputObjectSchema as DeliveryUpdatephotosInputObjectSchema } from './DeliveryUpdatephotosInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { rentalsUpdateOneRequiredWithoutDeliveriesNestedInputObjectSchema as rentalsUpdateOneRequiredWithoutDeliveriesNestedInputObjectSchema } from './rentalsUpdateOneRequiredWithoutDeliveriesNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([DeliveryTypeSchema, z.lazy(() => EnumDeliveryTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([DeliveryStatusSchema, z.lazy(() => EnumDeliveryStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  scheduledAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  completedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  address: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  distance: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'distance' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  vehicleId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  driverId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  driverName: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  photos: z.union([z.lazy(() => DeliveryUpdatephotosInputObjectSchema), z.string().array()]).optional(),
  checklist: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  rental: z.lazy(() => rentalsUpdateOneRequiredWithoutDeliveriesNestedInputObjectSchema).optional()
}).strict();
export const DeliveryUpdateInputObjectSchema: z.ZodType<Prisma.DeliveryUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryUpdateInput>;
export const DeliveryUpdateInputObjectZodSchema = makeSchema();
