/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentTypeSchema } from '../enums/PaymentType.schema'

const nestedenumpaymenttypefilterSchema = z.object({
  equals: PaymentTypeSchema.optional(),
  in: PaymentTypeSchema.array().optional(),
  notIn: PaymentTypeSchema.array().optional(),
  not: z.union([PaymentTypeSchema, z.lazy(() => NestedEnumPaymentTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumPaymentTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumPaymentTypeFilter> = nestedenumpaymenttypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumPaymentTypeFilter>;
export const NestedEnumPaymentTypeFilterObjectZodSchema = nestedenumpaymenttypefilterSchema;
