import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumPaymentStatusFilterObjectSchema as NestedEnumPaymentStatusFilterObjectSchema } from './NestedEnumPaymentStatusFilter.schema'

const nestedenumpaymentstatuswithaggregatesfilterSchema = z.object({
  equals: PaymentStatusSchema.optional(),
  in: PaymentStatusSchema.array().optional(),
  notIn: PaymentStatusSchema.array().optional(),
  not: z.union([PaymentStatusSchema, z.lazy(() => NestedEnumPaymentStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumPaymentStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumPaymentStatusFilterObjectSchema).optional()
}).strict();
export const NestedEnumPaymentStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumPaymentStatusWithAggregatesFilter> = nestedenumpaymentstatuswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumPaymentStatusWithAggregatesFilter>;
export const NestedEnumPaymentStatusWithAggregatesFilterObjectZodSchema = nestedenumpaymentstatuswithaggregatesfilterSchema;
