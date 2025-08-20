import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rentalsUpdateWithoutRental_itemsInputObjectSchema } from './rentalsUpdateWithoutRental_itemsInput.schema'
import { rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema } from './rentalsUncheckedUpdateWithoutRental_itemsInput.schema'
import { rentalsCreateWithoutRental_itemsInputObjectSchema } from './rentalsCreateWithoutRental_itemsInput.schema'
import { rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema } from './rentalsUncheckedCreateWithoutRental_itemsInput.schema'
import { rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

export const rentalsUpsertWithoutRental_itemsInputObjectSchema: z.ZodType<
  Prisma.rentalsUpsertWithoutRental_itemsInput,
  Prisma.rentalsUpsertWithoutRental_itemsInput
> = z
  .object({
    update: z.union([
      z.lazy(() => rentalsUpdateWithoutRental_itemsInputObjectSchema),
      z.lazy(() => rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => rentalsCreateWithoutRental_itemsInputObjectSchema),
      z.lazy(() => rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema),
    ]),
    where: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  })
  .strict()
export const rentalsUpsertWithoutRental_itemsInputObjectZodSchema = z
  .object({
    update: z.union([
      z.lazy(() => rentalsUpdateWithoutRental_itemsInputObjectSchema),
      z.lazy(() => rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => rentalsCreateWithoutRental_itemsInputObjectSchema),
      z.lazy(() => rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema),
    ]),
    where: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  })
  .strict()
