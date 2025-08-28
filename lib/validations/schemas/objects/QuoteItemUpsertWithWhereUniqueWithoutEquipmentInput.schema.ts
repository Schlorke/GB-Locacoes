import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema'
import { QuoteItemUpdateWithoutEquipmentInputObjectSchema } from './QuoteItemUpdateWithoutEquipmentInput.schema'
import { QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedUpdateWithoutEquipmentInput.schema'
import { QuoteItemCreateWithoutEquipmentInputObjectSchema } from './QuoteItemCreateWithoutEquipmentInput.schema'
import { QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedCreateWithoutEquipmentInput.schema'

const makeSchema = (): z.ZodObject<any> =>
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
export const QuoteItemUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemUpsertWithWhereUniqueWithoutEquipmentInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpsertWithWhereUniqueWithoutEquipmentInput>
export const QuoteItemUpsertWithWhereUniqueWithoutEquipmentInputObjectZodSchema =
  makeSchema()
