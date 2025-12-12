/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentCreateWithoutRentalInputObjectSchema as PaymentCreateWithoutRentalInputObjectSchema } from './PaymentCreateWithoutRentalInput.schema';
import { PaymentUncheckedCreateWithoutRentalInputObjectSchema as PaymentUncheckedCreateWithoutRentalInputObjectSchema } from './PaymentUncheckedCreateWithoutRentalInput.schema';
import { PaymentCreateOrConnectWithoutRentalInputObjectSchema as PaymentCreateOrConnectWithoutRentalInputObjectSchema } from './PaymentCreateOrConnectWithoutRentalInput.schema';
import { PaymentUpsertWithWhereUniqueWithoutRentalInputObjectSchema as PaymentUpsertWithWhereUniqueWithoutRentalInputObjectSchema } from './PaymentUpsertWithWhereUniqueWithoutRentalInput.schema';
import { PaymentCreateManyRentalInputEnvelopeObjectSchema as PaymentCreateManyRentalInputEnvelopeObjectSchema } from './PaymentCreateManyRentalInputEnvelope.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithWhereUniqueWithoutRentalInputObjectSchema as PaymentUpdateWithWhereUniqueWithoutRentalInputObjectSchema } from './PaymentUpdateWithWhereUniqueWithoutRentalInput.schema';
import { PaymentUpdateManyWithWhereWithoutRentalInputObjectSchema as PaymentUpdateManyWithWhereWithoutRentalInputObjectSchema } from './PaymentUpdateManyWithWhereWithoutRentalInput.schema';
import { PaymentScalarWhereInputObjectSchema as PaymentScalarWhereInputObjectSchema } from './PaymentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PaymentCreateWithoutRentalInputObjectSchema), z.lazy(() => PaymentCreateWithoutRentalInputObjectSchema).array(), z.lazy(() => PaymentUncheckedCreateWithoutRentalInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutRentalInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PaymentCreateOrConnectWithoutRentalInputObjectSchema), z.lazy(() => PaymentCreateOrConnectWithoutRentalInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PaymentUpsertWithWhereUniqueWithoutRentalInputObjectSchema), z.lazy(() => PaymentUpsertWithWhereUniqueWithoutRentalInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PaymentCreateManyRentalInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PaymentUpdateWithWhereUniqueWithoutRentalInputObjectSchema), z.lazy(() => PaymentUpdateWithWhereUniqueWithoutRentalInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PaymentUpdateManyWithWhereWithoutRentalInputObjectSchema), z.lazy(() => PaymentUpdateManyWithWhereWithoutRentalInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PaymentScalarWhereInputObjectSchema), z.lazy(() => PaymentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PaymentUpdateManyWithoutRentalNestedInputObjectSchema: z.ZodType<Prisma.PaymentUpdateManyWithoutRentalNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUpdateManyWithoutRentalNestedInput>;
export const PaymentUpdateManyWithoutRentalNestedInputObjectZodSchema = makeSchema();
