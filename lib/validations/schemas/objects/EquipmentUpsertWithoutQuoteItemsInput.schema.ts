/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentUpdateWithoutQuoteItemsInputObjectSchema as EquipmentUpdateWithoutQuoteItemsInputObjectSchema } from './EquipmentUpdateWithoutQuoteItemsInput.schema'
import { EquipmentUncheckedUpdateWithoutQuoteItemsInputObjectSchema as EquipmentUncheckedUpdateWithoutQuoteItemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutQuoteItemsInput.schema'
import { EquipmentCreateWithoutQuoteItemsInputObjectSchema as EquipmentCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateWithoutQuoteItemsInput.schema'
import { EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema as EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutQuoteItemsInput.schema'
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => EquipmentUpdateWithoutQuoteItemsInputObjectSchema),
        z.lazy(
          () => EquipmentUncheckedUpdateWithoutQuoteItemsInputObjectSchema
        ),
      ]),
      create: z.union([
        z.lazy(() => EquipmentCreateWithoutQuoteItemsInputObjectSchema),
        z.lazy(
          () => EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema
        ),
      ]),
      where: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
    })
    .strict()
export const EquipmentUpsertWithoutQuoteItemsInputObjectSchema: z.ZodType<Prisma.EquipmentUpsertWithoutQuoteItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpsertWithoutQuoteItemsInput>
export const EquipmentUpsertWithoutQuoteItemsInputObjectZodSchema = makeSchema()
