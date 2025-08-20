import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema'
import { QuoteItemUpdateWithoutEquipmentInputObjectSchema } from './QuoteItemUpdateWithoutEquipmentInput.schema'
import { QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedUpdateWithoutEquipmentInput.schema'
import { QuoteItemCreateWithoutEquipmentInputObjectSchema } from './QuoteItemCreateWithoutEquipmentInput.schema'
import { QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedCreateWithoutEquipmentInput.schema'

export const QuoteItemUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema: z.ZodType<
  Prisma.QuoteItemUpsertWithWhereUniqueWithoutEquipmentInput,
  Prisma.QuoteItemUpsertWithWhereUniqueWithoutEquipmentInput
> = z
  .object({
    where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => QuoteItemUpdateWithoutEquipmentInputObjectSchema),
      z.lazy(() => QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => QuoteItemCreateWithoutEquipmentInputObjectSchema),
      z.lazy(() => QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema),
    ]),
  })
  .strict()
export const QuoteItemUpsertWithWhereUniqueWithoutEquipmentInputObjectZodSchema =
  z
    .object({
      where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => QuoteItemUpdateWithoutEquipmentInputObjectSchema),
        z.lazy(() => QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => QuoteItemCreateWithoutEquipmentInputObjectSchema),
        z.lazy(() => QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema),
      ]),
    })
    .strict()
