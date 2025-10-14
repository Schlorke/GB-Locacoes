/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentCreateWithoutQuoteItemsInputObjectSchema as EquipmentCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateWithoutQuoteItemsInput.schema'
import { EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema as EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutQuoteItemsInput.schema'
import { EquipmentCreateOrConnectWithoutQuoteItemsInputObjectSchema as EquipmentCreateOrConnectWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateOrConnectWithoutQuoteItemsInput.schema'
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => EquipmentCreateWithoutQuoteItemsInputObjectSchema),
          z.lazy(
            () => EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => EquipmentCreateOrConnectWithoutQuoteItemsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional(),
    })
    .strict()
export const EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema: z.ZodType<Prisma.EquipmentCreateNestedOneWithoutQuoteItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateNestedOneWithoutQuoteItemsInput>
export const EquipmentCreateNestedOneWithoutQuoteItemsInputObjectZodSchema =
  makeSchema()
