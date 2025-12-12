/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema';
import { NestedEnumPaymentMethodFilterObjectSchema as NestedEnumPaymentMethodFilterObjectSchema } from './NestedEnumPaymentMethodFilter.schema'

const makeSchema = () => z.object({
  equals: PaymentMethodSchema.optional(),
  in: PaymentMethodSchema.array().optional(),
  notIn: PaymentMethodSchema.array().optional(),
  not: z.union([PaymentMethodSchema, z.lazy(() => NestedEnumPaymentMethodFilterObjectSchema)]).optional()
}).strict();
export const EnumPaymentMethodFilterObjectSchema: z.ZodType<Prisma.EnumPaymentMethodFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPaymentMethodFilter>;
export const EnumPaymentMethodFilterObjectZodSchema = makeSchema();
