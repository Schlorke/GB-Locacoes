/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereInputObjectSchema as PaymentWhereInputObjectSchema } from './PaymentWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentWhereInputObjectSchema).optional()
}).strict();
export const QuoteCountOutputTypeCountPaymentsArgsObjectSchema = makeSchema();
export const QuoteCountOutputTypeCountPaymentsArgsObjectZodSchema = makeSchema();
