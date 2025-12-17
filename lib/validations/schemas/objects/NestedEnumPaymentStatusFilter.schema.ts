import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema'

const nestedenumpaymentstatusfilterSchema = z.object({
  equals: PaymentStatusSchema.optional(),
  in: PaymentStatusSchema.array().optional(),
  notIn: PaymentStatusSchema.array().optional(),
  not: z.union([PaymentStatusSchema, z.lazy(() => NestedEnumPaymentStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumPaymentStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumPaymentStatusFilter> = nestedenumpaymentstatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumPaymentStatusFilter>;
export const NestedEnumPaymentStatusFilterObjectZodSchema = nestedenumpaymentstatusfilterSchema;
