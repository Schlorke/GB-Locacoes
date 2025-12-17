/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumDeliveryTypeWithAggregatesFilterObjectSchema as EnumDeliveryTypeWithAggregatesFilterObjectSchema } from './EnumDeliveryTypeWithAggregatesFilter.schema';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema';
import { EnumDeliveryStatusWithAggregatesFilterObjectSchema as EnumDeliveryStatusWithAggregatesFilterObjectSchema } from './EnumDeliveryStatusWithAggregatesFilter.schema';
import { DeliveryStatusSchema } from '../enums/DeliveryStatus.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema as JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema';
import { DecimalNullableWithAggregatesFilterObjectSchema as DecimalNullableWithAggregatesFilterObjectSchema } from './DecimalNullableWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const deliveryscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => DeliveryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => DeliveryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => DeliveryScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => DeliveryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => DeliveryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  rentalId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumDeliveryTypeWithAggregatesFilterObjectSchema), DeliveryTypeSchema]).optional(),
  status: z.union([z.lazy(() => EnumDeliveryStatusWithAggregatesFilterObjectSchema), DeliveryStatusSchema]).optional(),
  scheduledAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  completedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  address: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  distance: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'distance' must be a Decimal",
})]).optional().nullable(),
  vehicleId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  driverId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  driverName: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  photos: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  checklist: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  notes: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const DeliveryScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.DeliveryScalarWhereWithAggregatesInput> = deliveryscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.DeliveryScalarWhereWithAggregatesInput>;
export const DeliveryScalarWhereWithAggregatesInputObjectZodSchema = deliveryscalarwherewithaggregatesinputSchema;
