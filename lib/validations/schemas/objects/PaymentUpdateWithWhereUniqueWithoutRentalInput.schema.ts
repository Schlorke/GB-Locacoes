import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithoutRentalInputObjectSchema as PaymentUpdateWithoutRentalInputObjectSchema } from './PaymentUpdateWithoutRentalInput.schema';
import { PaymentUncheckedUpdateWithoutRentalInputObjectSchema as PaymentUncheckedUpdateWithoutRentalInputObjectSchema } from './PaymentUncheckedUpdateWithoutRentalInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PaymentUpdateWithoutRentalInputObjectSchema), z.lazy(() => PaymentUncheckedUpdateWithoutRentalInputObjectSchema)])
}).strict();
export const PaymentUpdateWithWhereUniqueWithoutRentalInputObjectSchema: z.ZodType<Prisma.PaymentUpdateWithWhereUniqueWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUpdateWithWhereUniqueWithoutRentalInput>;
export const PaymentUpdateWithWhereUniqueWithoutRentalInputObjectZodSchema = makeSchema();
