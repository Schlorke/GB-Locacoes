/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsUpdateWithoutPaymentsInputObjectSchema as rentalsUpdateWithoutPaymentsInputObjectSchema } from './rentalsUpdateWithoutPaymentsInput.schema';
import { rentalsUncheckedUpdateWithoutPaymentsInputObjectSchema as rentalsUncheckedUpdateWithoutPaymentsInputObjectSchema } from './rentalsUncheckedUpdateWithoutPaymentsInput.schema';
import { rentalsCreateWithoutPaymentsInputObjectSchema as rentalsCreateWithoutPaymentsInputObjectSchema } from './rentalsCreateWithoutPaymentsInput.schema';
import { rentalsUncheckedCreateWithoutPaymentsInputObjectSchema as rentalsUncheckedCreateWithoutPaymentsInputObjectSchema } from './rentalsUncheckedCreateWithoutPaymentsInput.schema';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => rentalsUpdateWithoutPaymentsInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutPaymentsInputObjectSchema)]),
  create: z.union([z.lazy(() => rentalsCreateWithoutPaymentsInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutPaymentsInputObjectSchema)]),
  where: z.lazy(() => rentalsWhereInputObjectSchema).optional()
}).strict();
export const rentalsUpsertWithoutPaymentsInputObjectSchema: z.ZodType<Prisma.rentalsUpsertWithoutPaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpsertWithoutPaymentsInput>;
export const rentalsUpsertWithoutPaymentsInputObjectZodSchema = makeSchema();
