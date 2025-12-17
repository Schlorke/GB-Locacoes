/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';
import { NestedEnumPaymentStatusWithAggregatesFilterObjectSchema as NestedEnumPaymentStatusWithAggregatesFilterObjectSchema } from './NestedEnumPaymentStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumPaymentStatusFilterObjectSchema as NestedEnumPaymentStatusFilterObjectSchema } from './NestedEnumPaymentStatusFilter.schema'

const makeSchema = () => z.object({
  equals: PaymentStatusSchema.optional(),
  in: PaymentStatusSchema.array().optional(),
  notIn: PaymentStatusSchema.array().optional(),
  not: z.union([PaymentStatusSchema, z.lazy(() => NestedEnumPaymentStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumPaymentStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumPaymentStatusFilterObjectSchema).optional()
}).strict();
export const EnumPaymentStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumPaymentStatusWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPaymentStatusWithAggregatesFilter>;
export const EnumPaymentStatusWithAggregatesFilterObjectZodSchema = makeSchema();
