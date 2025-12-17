/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsUpdateWithoutDeliveriesInputObjectSchema as rentalsUpdateWithoutDeliveriesInputObjectSchema } from './rentalsUpdateWithoutDeliveriesInput.schema';
import { rentalsUncheckedUpdateWithoutDeliveriesInputObjectSchema as rentalsUncheckedUpdateWithoutDeliveriesInputObjectSchema } from './rentalsUncheckedUpdateWithoutDeliveriesInput.schema';
import { rentalsCreateWithoutDeliveriesInputObjectSchema as rentalsCreateWithoutDeliveriesInputObjectSchema } from './rentalsCreateWithoutDeliveriesInput.schema';
import { rentalsUncheckedCreateWithoutDeliveriesInputObjectSchema as rentalsUncheckedCreateWithoutDeliveriesInputObjectSchema } from './rentalsUncheckedCreateWithoutDeliveriesInput.schema';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => rentalsUpdateWithoutDeliveriesInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutDeliveriesInputObjectSchema)]),
  create: z.union([z.lazy(() => rentalsCreateWithoutDeliveriesInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutDeliveriesInputObjectSchema)]),
  where: z.lazy(() => rentalsWhereInputObjectSchema).optional()
}).strict();
export const rentalsUpsertWithoutDeliveriesInputObjectSchema: z.ZodType<Prisma.rentalsUpsertWithoutDeliveriesInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpsertWithoutDeliveriesInput>;
export const rentalsUpsertWithoutDeliveriesInputObjectZodSchema = makeSchema();
