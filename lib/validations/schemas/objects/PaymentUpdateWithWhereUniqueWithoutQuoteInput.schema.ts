import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithoutQuoteInputObjectSchema as PaymentUpdateWithoutQuoteInputObjectSchema } from './PaymentUpdateWithoutQuoteInput.schema';
import { PaymentUncheckedUpdateWithoutQuoteInputObjectSchema as PaymentUncheckedUpdateWithoutQuoteInputObjectSchema } from './PaymentUncheckedUpdateWithoutQuoteInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PaymentUpdateWithoutQuoteInputObjectSchema), z.lazy(() => PaymentUncheckedUpdateWithoutQuoteInputObjectSchema)])
}).strict();
export const PaymentUpdateWithWhereUniqueWithoutQuoteInputObjectSchema: z.ZodType<Prisma.PaymentUpdateWithWhereUniqueWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUpdateWithWhereUniqueWithoutQuoteInput>;
export const PaymentUpdateWithWhereUniqueWithoutQuoteInputObjectZodSchema = makeSchema();
