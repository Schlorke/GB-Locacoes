/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';
import { NestedEnumPaymentStatusFilterObjectSchema as NestedEnumPaymentStatusFilterObjectSchema } from './NestedEnumPaymentStatusFilter.schema'

const makeSchema = () => z.object({
  equals: PaymentStatusSchema.optional(),
  in: PaymentStatusSchema.array().optional(),
  notIn: PaymentStatusSchema.array().optional(),
  not: z.union([PaymentStatusSchema, z.lazy(() => NestedEnumPaymentStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumPaymentStatusFilterObjectSchema: z.ZodType<Prisma.EnumPaymentStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPaymentStatusFilter>;
export const EnumPaymentStatusFilterObjectZodSchema = makeSchema();
