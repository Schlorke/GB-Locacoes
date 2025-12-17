/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentCreateWithoutQuoteInputObjectSchema as PaymentCreateWithoutQuoteInputObjectSchema } from './PaymentCreateWithoutQuoteInput.schema';
import { PaymentUncheckedCreateWithoutQuoteInputObjectSchema as PaymentUncheckedCreateWithoutQuoteInputObjectSchema } from './PaymentUncheckedCreateWithoutQuoteInput.schema';
import { PaymentCreateOrConnectWithoutQuoteInputObjectSchema as PaymentCreateOrConnectWithoutQuoteInputObjectSchema } from './PaymentCreateOrConnectWithoutQuoteInput.schema';
import { PaymentUpsertWithWhereUniqueWithoutQuoteInputObjectSchema as PaymentUpsertWithWhereUniqueWithoutQuoteInputObjectSchema } from './PaymentUpsertWithWhereUniqueWithoutQuoteInput.schema';
import { PaymentCreateManyQuoteInputEnvelopeObjectSchema as PaymentCreateManyQuoteInputEnvelopeObjectSchema } from './PaymentCreateManyQuoteInputEnvelope.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithWhereUniqueWithoutQuoteInputObjectSchema as PaymentUpdateWithWhereUniqueWithoutQuoteInputObjectSchema } from './PaymentUpdateWithWhereUniqueWithoutQuoteInput.schema';
import { PaymentUpdateManyWithWhereWithoutQuoteInputObjectSchema as PaymentUpdateManyWithWhereWithoutQuoteInputObjectSchema } from './PaymentUpdateManyWithWhereWithoutQuoteInput.schema';
import { PaymentScalarWhereInputObjectSchema as PaymentScalarWhereInputObjectSchema } from './PaymentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PaymentCreateWithoutQuoteInputObjectSchema), z.lazy(() => PaymentCreateWithoutQuoteInputObjectSchema).array(), z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputObjectSchema), z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PaymentUpsertWithWhereUniqueWithoutQuoteInputObjectSchema), z.lazy(() => PaymentUpsertWithWhereUniqueWithoutQuoteInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PaymentCreateManyQuoteInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PaymentUpdateWithWhereUniqueWithoutQuoteInputObjectSchema), z.lazy(() => PaymentUpdateWithWhereUniqueWithoutQuoteInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PaymentUpdateManyWithWhereWithoutQuoteInputObjectSchema), z.lazy(() => PaymentUpdateManyWithWhereWithoutQuoteInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PaymentScalarWhereInputObjectSchema), z.lazy(() => PaymentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PaymentUncheckedUpdateManyWithoutQuoteNestedInputObjectSchema: z.ZodType<Prisma.PaymentUncheckedUpdateManyWithoutQuoteNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUncheckedUpdateManyWithoutQuoteNestedInput>;
export const PaymentUncheckedUpdateManyWithoutQuoteNestedInputObjectZodSchema = makeSchema();
