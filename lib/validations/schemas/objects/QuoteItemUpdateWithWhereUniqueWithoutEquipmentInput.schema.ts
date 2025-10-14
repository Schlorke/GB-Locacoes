/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema'
import { QuoteItemUpdateWithoutEquipmentInputObjectSchema as QuoteItemUpdateWithoutEquipmentInputObjectSchema } from './QuoteItemUpdateWithoutEquipmentInput.schema'
import { QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema as QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedUpdateWithoutEquipmentInput.schema'

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => QuoteItemUpdateWithoutEquipmentInputObjectSchema),
        z.lazy(() => QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema),
      ]),
    })
    .strict()
export const QuoteItemUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemUpdateWithWhereUniqueWithoutEquipmentInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpdateWithWhereUniqueWithoutEquipmentInput>
export const QuoteItemUpdateWithWhereUniqueWithoutEquipmentInputObjectZodSchema =
  makeSchema()
