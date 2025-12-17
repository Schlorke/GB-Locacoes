/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentCreateWithoutRentalInputObjectSchema as PaymentCreateWithoutRentalInputObjectSchema } from './PaymentCreateWithoutRentalInput.schema';
import { PaymentUncheckedCreateWithoutRentalInputObjectSchema as PaymentUncheckedCreateWithoutRentalInputObjectSchema } from './PaymentUncheckedCreateWithoutRentalInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PaymentCreateWithoutRentalInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutRentalInputObjectSchema)])
}).strict();
export const PaymentCreateOrConnectWithoutRentalInputObjectSchema: z.ZodType<Prisma.PaymentCreateOrConnectWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentCreateOrConnectWithoutRentalInput>;
export const PaymentCreateOrConnectWithoutRentalInputObjectZodSchema = makeSchema();
