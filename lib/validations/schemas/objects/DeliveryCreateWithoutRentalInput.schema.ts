import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema';
import { DeliveryStatusSchema } from '../enums/DeliveryStatus.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { DeliveryCreatephotosInputObjectSchema as DeliveryCreatephotosInputObjectSchema } from './DeliveryCreatephotosInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  type: DeliveryTypeSchema,
  status: DeliveryStatusSchema.optional(),
  scheduledAt: z.coerce.date(),
  completedAt: z.coerce.date().optional().nullable(),
  address: z.union([JsonNullValueInputSchema, jsonSchema]),
  distance: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'distance' must be a Decimal",
}).optional().nullable(),
  vehicleId: z.string().optional().nullable(),
  driverId: z.string().optional().nullable(),
  driverName: z.string().optional().nullable(),
  photos: z.union([z.lazy(() => DeliveryCreatephotosInputObjectSchema), z.string().array()]).optional(),
  checklist: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const DeliveryCreateWithoutRentalInputObjectSchema: z.ZodType<Prisma.DeliveryCreateWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryCreateWithoutRentalInput>;
export const DeliveryCreateWithoutRentalInputObjectZodSchema = makeSchema();
