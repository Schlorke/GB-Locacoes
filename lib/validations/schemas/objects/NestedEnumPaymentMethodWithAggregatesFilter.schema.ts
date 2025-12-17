import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumPaymentMethodFilterObjectSchema as NestedEnumPaymentMethodFilterObjectSchema } from './NestedEnumPaymentMethodFilter.schema'

const nestedenumpaymentmethodwithaggregatesfilterSchema = z.object({
  equals: PaymentMethodSchema.optional(),
  in: PaymentMethodSchema.array().optional(),
  notIn: PaymentMethodSchema.array().optional(),
  not: z.union([PaymentMethodSchema, z.lazy(() => NestedEnumPaymentMethodWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumPaymentMethodFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumPaymentMethodFilterObjectSchema).optional()
}).strict();
export const NestedEnumPaymentMethodWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumPaymentMethodWithAggregatesFilter> = nestedenumpaymentmethodwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumPaymentMethodWithAggregatesFilter>;
export const NestedEnumPaymentMethodWithAggregatesFilterObjectZodSchema = nestedenumpaymentmethodwithaggregatesfilterSchema;
