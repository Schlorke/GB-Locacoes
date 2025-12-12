/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsCreateWithoutPaymentsInputObjectSchema as rentalsCreateWithoutPaymentsInputObjectSchema } from './rentalsCreateWithoutPaymentsInput.schema';
import { rentalsUncheckedCreateWithoutPaymentsInputObjectSchema as rentalsUncheckedCreateWithoutPaymentsInputObjectSchema } from './rentalsUncheckedCreateWithoutPaymentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => rentalsCreateWithoutPaymentsInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutPaymentsInputObjectSchema)])
}).strict();
export const rentalsCreateOrConnectWithoutPaymentsInputObjectSchema: z.ZodType<Prisma.rentalsCreateOrConnectWithoutPaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateOrConnectWithoutPaymentsInput>;
export const rentalsCreateOrConnectWithoutPaymentsInputObjectZodSchema = makeSchema();
