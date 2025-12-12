/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsArgsObjectSchema as rentalsArgsObjectSchema } from './rentalsArgs.schema';
import { QuoteArgsObjectSchema as QuoteArgsObjectSchema } from './QuoteArgs.schema'

const makeSchema = () => z.object({
  rental: z.union([z.boolean(), z.lazy(() => rentalsArgsObjectSchema)]).optional(),
  quote: z.union([z.boolean(), z.lazy(() => QuoteArgsObjectSchema)]).optional()
}).strict();
export const PaymentIncludeObjectSchema: z.ZodType<Prisma.PaymentInclude> = makeSchema() as unknown as z.ZodType<Prisma.PaymentInclude>;
export const PaymentIncludeObjectZodSchema = makeSchema();
