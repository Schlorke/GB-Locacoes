/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentTypeSchema } from '../enums/PaymentType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumPaymentTypeFilterObjectSchema as NestedEnumPaymentTypeFilterObjectSchema } from './NestedEnumPaymentTypeFilter.schema'

const nestedenumpaymenttypewithaggregatesfilterSchema = z.object({
  equals: PaymentTypeSchema.optional(),
  in: PaymentTypeSchema.array().optional(),
  notIn: PaymentTypeSchema.array().optional(),
  not: z.union([PaymentTypeSchema, z.lazy(() => NestedEnumPaymentTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumPaymentTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumPaymentTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumPaymentTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumPaymentTypeWithAggregatesFilter> = nestedenumpaymenttypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumPaymentTypeWithAggregatesFilter>;
export const NestedEnumPaymentTypeWithAggregatesFilterObjectZodSchema = nestedenumpaymenttypewithaggregatesfilterSchema;
