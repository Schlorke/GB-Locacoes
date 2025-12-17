import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentCreateWithoutRentalInputObjectSchema as PaymentCreateWithoutRentalInputObjectSchema } from './PaymentCreateWithoutRentalInput.schema';
import { PaymentUncheckedCreateWithoutRentalInputObjectSchema as PaymentUncheckedCreateWithoutRentalInputObjectSchema } from './PaymentUncheckedCreateWithoutRentalInput.schema';
import { PaymentCreateOrConnectWithoutRentalInputObjectSchema as PaymentCreateOrConnectWithoutRentalInputObjectSchema } from './PaymentCreateOrConnectWithoutRentalInput.schema';
import { PaymentCreateManyRentalInputEnvelopeObjectSchema as PaymentCreateManyRentalInputEnvelopeObjectSchema } from './PaymentCreateManyRentalInputEnvelope.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PaymentCreateWithoutRentalInputObjectSchema), z.lazy(() => PaymentCreateWithoutRentalInputObjectSchema).array(), z.lazy(() => PaymentUncheckedCreateWithoutRentalInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutRentalInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PaymentCreateOrConnectWithoutRentalInputObjectSchema), z.lazy(() => PaymentCreateOrConnectWithoutRentalInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PaymentCreateManyRentalInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PaymentCreateNestedManyWithoutRentalInputObjectSchema: z.ZodType<Prisma.PaymentCreateNestedManyWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentCreateNestedManyWithoutRentalInput>;
export const PaymentCreateNestedManyWithoutRentalInputObjectZodSchema = makeSchema();
