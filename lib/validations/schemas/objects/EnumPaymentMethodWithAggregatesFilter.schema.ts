/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema';
import { NestedEnumPaymentMethodWithAggregatesFilterObjectSchema as NestedEnumPaymentMethodWithAggregatesFilterObjectSchema } from './NestedEnumPaymentMethodWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumPaymentMethodFilterObjectSchema as NestedEnumPaymentMethodFilterObjectSchema } from './NestedEnumPaymentMethodFilter.schema'

const makeSchema = () => z.object({
  equals: PaymentMethodSchema.optional(),
  in: PaymentMethodSchema.array().optional(),
  notIn: PaymentMethodSchema.array().optional(),
  not: z.union([PaymentMethodSchema, z.lazy(() => NestedEnumPaymentMethodWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumPaymentMethodFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumPaymentMethodFilterObjectSchema).optional()
}).strict();
export const EnumPaymentMethodWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumPaymentMethodWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPaymentMethodWithAggregatesFilter>;
export const EnumPaymentMethodWithAggregatesFilterObjectZodSchema = makeSchema();
