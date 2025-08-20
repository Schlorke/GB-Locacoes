import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateWithoutQuoteItemsInput.schema'
import { EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutQuoteItemsInput.schema'
import { EquipmentCreateOrConnectWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateOrConnectWithoutQuoteItemsInput.schema'
import { EquipmentUpsertWithoutQuoteItemsInputObjectSchema } from './EquipmentUpsertWithoutQuoteItemsInput.schema'
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'
import { EquipmentUpdateToOneWithWhereWithoutQuoteItemsInputObjectSchema } from './EquipmentUpdateToOneWithWhereWithoutQuoteItemsInput.schema'
import { EquipmentUpdateWithoutQuoteItemsInputObjectSchema } from './EquipmentUpdateWithoutQuoteItemsInput.schema'
import { EquipmentUncheckedUpdateWithoutQuoteItemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutQuoteItemsInput.schema'

export const EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInputObjectSchema: z.ZodType<
  Prisma.EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInput,
  Prisma.EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInput
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
    upsert: z
      .lazy(() => EquipmentUpsertWithoutQuoteItemsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(
          () => EquipmentUpdateToOneWithWhereWithoutQuoteItemsInputObjectSchema
        ),
        z.lazy(() => EquipmentUpdateWithoutQuoteItemsInputObjectSchema),
        z.lazy(
          () => EquipmentUncheckedUpdateWithoutQuoteItemsInputObjectSchema
        ),
      ])
      .optional(),
  })
  .strict()
export const EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInputObjectZodSchema =
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
      upsert: z
        .lazy(() => EquipmentUpsertWithoutQuoteItemsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () =>
              EquipmentUpdateToOneWithWhereWithoutQuoteItemsInputObjectSchema
          ),
          z.lazy(() => EquipmentUpdateWithoutQuoteItemsInputObjectSchema),
          z.lazy(
            () => EquipmentUncheckedUpdateWithoutQuoteItemsInputObjectSchema
          ),
        ])
        .optional(),
    })
    .strict()
