import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentTypeSchema } from '../enums/PaymentType.schema';
import { NestedEnumPaymentTypeFilterObjectSchema as NestedEnumPaymentTypeFilterObjectSchema } from './NestedEnumPaymentTypeFilter.schema'

const makeSchema = () => z.object({
  equals: PaymentTypeSchema.optional(),
  in: PaymentTypeSchema.array().optional(),
  notIn: PaymentTypeSchema.array().optional(),
  not: z.union([PaymentTypeSchema, z.lazy(() => NestedEnumPaymentTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumPaymentTypeFilterObjectSchema: z.ZodType<Prisma.EnumPaymentTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPaymentTypeFilter>;
export const EnumPaymentTypeFilterObjectZodSchema = makeSchema();
