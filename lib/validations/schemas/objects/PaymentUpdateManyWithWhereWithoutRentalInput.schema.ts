/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentScalarWhereInputObjectSchema as PaymentScalarWhereInputObjectSchema } from './PaymentScalarWhereInput.schema';
import { PaymentUpdateManyMutationInputObjectSchema as PaymentUpdateManyMutationInputObjectSchema } from './PaymentUpdateManyMutationInput.schema';
import { PaymentUncheckedUpdateManyWithoutRentalInputObjectSchema as PaymentUncheckedUpdateManyWithoutRentalInputObjectSchema } from './PaymentUncheckedUpdateManyWithoutRentalInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PaymentUpdateManyMutationInputObjectSchema), z.lazy(() => PaymentUncheckedUpdateManyWithoutRentalInputObjectSchema)])
}).strict();
export const PaymentUpdateManyWithWhereWithoutRentalInputObjectSchema: z.ZodType<Prisma.PaymentUpdateManyWithWhereWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUpdateManyWithWhereWithoutRentalInput>;
export const PaymentUpdateManyWithWhereWithoutRentalInputObjectZodSchema = makeSchema();
