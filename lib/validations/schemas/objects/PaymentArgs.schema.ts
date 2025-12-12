/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentSelectObjectSchema as PaymentSelectObjectSchema } from './PaymentSelect.schema';
import { PaymentIncludeObjectSchema as PaymentIncludeObjectSchema } from './PaymentInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PaymentSelectObjectSchema).optional(),
  include: z.lazy(() => PaymentIncludeObjectSchema).optional()
}).strict();
export const PaymentArgsObjectSchema = makeSchema();
export const PaymentArgsObjectZodSchema = makeSchema();
