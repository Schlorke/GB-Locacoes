/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsUpdateWithoutRental_itemsInputObjectSchema as rentalsUpdateWithoutRental_itemsInputObjectSchema } from './rentalsUpdateWithoutRental_itemsInput.schema';
import { rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema as rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema } from './rentalsUncheckedUpdateWithoutRental_itemsInput.schema';
import { rentalsCreateWithoutRental_itemsInputObjectSchema as rentalsCreateWithoutRental_itemsInputObjectSchema } from './rentalsCreateWithoutRental_itemsInput.schema';
import { rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema as rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema } from './rentalsUncheckedCreateWithoutRental_itemsInput.schema';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => rentalsUpdateWithoutRental_itemsInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema)]),
  create: z.union([z.lazy(() => rentalsCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema)]),
  where: z.lazy(() => rentalsWhereInputObjectSchema).optional()
}).strict();
export const rentalsUpsertWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.rentalsUpsertWithoutRental_itemsInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpsertWithoutRental_itemsInput>;
export const rentalsUpsertWithoutRental_itemsInputObjectZodSchema = makeSchema();
