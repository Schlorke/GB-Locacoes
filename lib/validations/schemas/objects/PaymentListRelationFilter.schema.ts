import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereInputObjectSchema as PaymentWhereInputObjectSchema } from './PaymentWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => PaymentWhereInputObjectSchema).optional(),
  some: z.lazy(() => PaymentWhereInputObjectSchema).optional(),
  none: z.lazy(() => PaymentWhereInputObjectSchema).optional()
}).strict();
export const PaymentListRelationFilterObjectSchema: z.ZodType<Prisma.PaymentListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PaymentListRelationFilter>;
export const PaymentListRelationFilterObjectZodSchema = makeSchema();
