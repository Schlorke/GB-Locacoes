/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentScalarWhereInputObjectSchema as PaymentScalarWhereInputObjectSchema } from './PaymentScalarWhereInput.schema';
import { PaymentUpdateManyMutationInputObjectSchema as PaymentUpdateManyMutationInputObjectSchema } from './PaymentUpdateManyMutationInput.schema';
import { PaymentUncheckedUpdateManyWithoutQuoteInputObjectSchema as PaymentUncheckedUpdateManyWithoutQuoteInputObjectSchema } from './PaymentUncheckedUpdateManyWithoutQuoteInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PaymentUpdateManyMutationInputObjectSchema), z.lazy(() => PaymentUncheckedUpdateManyWithoutQuoteInputObjectSchema)])
}).strict();
export const PaymentUpdateManyWithWhereWithoutQuoteInputObjectSchema: z.ZodType<Prisma.PaymentUpdateManyWithWhereWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUpdateManyWithWhereWithoutQuoteInput>;
export const PaymentUpdateManyWithWhereWithoutQuoteInputObjectZodSchema = makeSchema();
