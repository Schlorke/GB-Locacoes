import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema'

const nestedenumpaymentmethodfilterSchema = z.object({
  equals: PaymentMethodSchema.optional(),
  in: PaymentMethodSchema.array().optional(),
  notIn: PaymentMethodSchema.array().optional(),
  not: z.union([PaymentMethodSchema, z.lazy(() => NestedEnumPaymentMethodFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumPaymentMethodFilterObjectSchema: z.ZodType<Prisma.NestedEnumPaymentMethodFilter> = nestedenumpaymentmethodfilterSchema as unknown as z.ZodType<Prisma.NestedEnumPaymentMethodFilter>;
export const NestedEnumPaymentMethodFilterObjectZodSchema = nestedenumpaymentmethodfilterSchema;
