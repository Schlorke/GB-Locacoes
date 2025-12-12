/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumDeliveryTypeFilterObjectSchema as EnumDeliveryTypeFilterObjectSchema } from './EnumDeliveryTypeFilter.schema';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema';
import { EnumDeliveryStatusFilterObjectSchema as EnumDeliveryStatusFilterObjectSchema } from './EnumDeliveryStatusFilter.schema';
import { DeliveryStatusSchema } from '../enums/DeliveryStatus.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const deliveryscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => DeliveryScalarWhereInputObjectSchema), z.lazy(() => DeliveryScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => DeliveryScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => DeliveryScalarWhereInputObjectSchema), z.lazy(() => DeliveryScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  rentalId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumDeliveryTypeFilterObjectSchema), DeliveryTypeSchema]).optional(),
  status: z.union([z.lazy(() => EnumDeliveryStatusFilterObjectSchema), DeliveryStatusSchema]).optional(),
  scheduledAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  completedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  address: z.lazy(() => JsonFilterObjectSchema).optional(),
  distance: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'distance' must be a Decimal",
})]).optional().nullable(),
  vehicleId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  driverId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  driverName: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  photos: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  checklist: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const DeliveryScalarWhereInputObjectSchema: z.ZodType<Prisma.DeliveryScalarWhereInput> = deliveryscalarwhereinputSchema as unknown as z.ZodType<Prisma.DeliveryScalarWhereInput>;
export const DeliveryScalarWhereInputObjectZodSchema = deliveryscalarwhereinputSchema;
