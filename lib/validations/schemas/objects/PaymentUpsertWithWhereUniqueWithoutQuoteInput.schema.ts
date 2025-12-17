import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithoutQuoteInputObjectSchema as PaymentUpdateWithoutQuoteInputObjectSchema } from './PaymentUpdateWithoutQuoteInput.schema';
import { PaymentUncheckedUpdateWithoutQuoteInputObjectSchema as PaymentUncheckedUpdateWithoutQuoteInputObjectSchema } from './PaymentUncheckedUpdateWithoutQuoteInput.schema';
import { PaymentCreateWithoutQuoteInputObjectSchema as PaymentCreateWithoutQuoteInputObjectSchema } from './PaymentCreateWithoutQuoteInput.schema';
import { PaymentUncheckedCreateWithoutQuoteInputObjectSchema as PaymentUncheckedCreateWithoutQuoteInputObjectSchema } from './PaymentUncheckedCreateWithoutQuoteInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PaymentUpdateWithoutQuoteInputObjectSchema), z.lazy(() => PaymentUncheckedUpdateWithoutQuoteInputObjectSchema)]),
  create: z.union([z.lazy(() => PaymentCreateWithoutQuoteInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputObjectSchema)])
}).strict();
export const PaymentUpsertWithWhereUniqueWithoutQuoteInputObjectSchema: z.ZodType<Prisma.PaymentUpsertWithWhereUniqueWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUpsertWithWhereUniqueWithoutQuoteInput>;
export const PaymentUpsertWithWhereUniqueWithoutQuoteInputObjectZodSchema = makeSchema();
