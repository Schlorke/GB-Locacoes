import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithoutRentalInputObjectSchema as PaymentUpdateWithoutRentalInputObjectSchema } from './PaymentUpdateWithoutRentalInput.schema';
import { PaymentUncheckedUpdateWithoutRentalInputObjectSchema as PaymentUncheckedUpdateWithoutRentalInputObjectSchema } from './PaymentUncheckedUpdateWithoutRentalInput.schema';
import { PaymentCreateWithoutRentalInputObjectSchema as PaymentCreateWithoutRentalInputObjectSchema } from './PaymentCreateWithoutRentalInput.schema';
import { PaymentUncheckedCreateWithoutRentalInputObjectSchema as PaymentUncheckedCreateWithoutRentalInputObjectSchema } from './PaymentUncheckedCreateWithoutRentalInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PaymentUpdateWithoutRentalInputObjectSchema), z.lazy(() => PaymentUncheckedUpdateWithoutRentalInputObjectSchema)]),
  create: z.union([z.lazy(() => PaymentCreateWithoutRentalInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutRentalInputObjectSchema)])
}).strict();
export const PaymentUpsertWithWhereUniqueWithoutRentalInputObjectSchema: z.ZodType<Prisma.PaymentUpsertWithWhereUniqueWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUpsertWithWhereUniqueWithoutRentalInput>;
export const PaymentUpsertWithWhereUniqueWithoutRentalInputObjectZodSchema = makeSchema();
