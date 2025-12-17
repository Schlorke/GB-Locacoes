import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentCreateManyQuoteInputObjectSchema as PaymentCreateManyQuoteInputObjectSchema } from './PaymentCreateManyQuoteInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PaymentCreateManyQuoteInputObjectSchema), z.lazy(() => PaymentCreateManyQuoteInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PaymentCreateManyQuoteInputEnvelopeObjectSchema: z.ZodType<Prisma.PaymentCreateManyQuoteInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PaymentCreateManyQuoteInputEnvelope>;
export const PaymentCreateManyQuoteInputEnvelopeObjectZodSchema = makeSchema();
