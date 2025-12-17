import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentCreateWithoutQuoteInputObjectSchema as PaymentCreateWithoutQuoteInputObjectSchema } from './PaymentCreateWithoutQuoteInput.schema';
import { PaymentUncheckedCreateWithoutQuoteInputObjectSchema as PaymentUncheckedCreateWithoutQuoteInputObjectSchema } from './PaymentUncheckedCreateWithoutQuoteInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PaymentCreateWithoutQuoteInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputObjectSchema)])
}).strict();
export const PaymentCreateOrConnectWithoutQuoteInputObjectSchema: z.ZodType<Prisma.PaymentCreateOrConnectWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentCreateOrConnectWithoutQuoteInput>;
export const PaymentCreateOrConnectWithoutQuoteInputObjectZodSchema = makeSchema();
