import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentCreateManyRentalInputObjectSchema as PaymentCreateManyRentalInputObjectSchema } from './PaymentCreateManyRentalInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PaymentCreateManyRentalInputObjectSchema), z.lazy(() => PaymentCreateManyRentalInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PaymentCreateManyRentalInputEnvelopeObjectSchema: z.ZodType<Prisma.PaymentCreateManyRentalInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PaymentCreateManyRentalInputEnvelope>;
export const PaymentCreateManyRentalInputEnvelopeObjectZodSchema = makeSchema();
