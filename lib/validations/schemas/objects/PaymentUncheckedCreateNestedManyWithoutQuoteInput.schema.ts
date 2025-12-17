import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentCreateWithoutQuoteInputObjectSchema as PaymentCreateWithoutQuoteInputObjectSchema } from './PaymentCreateWithoutQuoteInput.schema';
import { PaymentUncheckedCreateWithoutQuoteInputObjectSchema as PaymentUncheckedCreateWithoutQuoteInputObjectSchema } from './PaymentUncheckedCreateWithoutQuoteInput.schema';
import { PaymentCreateOrConnectWithoutQuoteInputObjectSchema as PaymentCreateOrConnectWithoutQuoteInputObjectSchema } from './PaymentCreateOrConnectWithoutQuoteInput.schema';
import { PaymentCreateManyQuoteInputEnvelopeObjectSchema as PaymentCreateManyQuoteInputEnvelopeObjectSchema } from './PaymentCreateManyQuoteInputEnvelope.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PaymentCreateWithoutQuoteInputObjectSchema), z.lazy(() => PaymentCreateWithoutQuoteInputObjectSchema).array(), z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputObjectSchema), z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PaymentCreateManyQuoteInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PaymentUncheckedCreateNestedManyWithoutQuoteInputObjectSchema: z.ZodType<Prisma.PaymentUncheckedCreateNestedManyWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUncheckedCreateNestedManyWithoutQuoteInput>;
export const PaymentUncheckedCreateNestedManyWithoutQuoteInputObjectZodSchema = makeSchema();
