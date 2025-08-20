import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateWithoutQuoteItemsInput.schema'
import { EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutQuoteItemsInput.schema'
import { EquipmentCreateOrConnectWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateOrConnectWithoutQuoteItemsInput.schema'
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'

export const EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema: z.ZodType<
  Prisma.EquipmentCreateNestedOneWithoutQuoteItemsInput,
  Prisma.EquipmentCreateNestedOneWithoutQuoteItemsInput
> = z
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
export const EquipmentCreateNestedOneWithoutQuoteItemsInputObjectZodSchema = z
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
