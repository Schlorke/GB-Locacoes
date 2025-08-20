import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema'
import { QuoteItemCreateWithoutEquipmentInputObjectSchema } from './QuoteItemCreateWithoutEquipmentInput.schema'
import { QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedCreateWithoutEquipmentInput.schema'

export const QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema: z.ZodType<
  Prisma.QuoteItemCreateOrConnectWithoutEquipmentInput,
  Prisma.QuoteItemCreateOrConnectWithoutEquipmentInput
> = z
  .object({
    where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => QuoteItemCreateWithoutEquipmentInputObjectSchema),
      z.lazy(() => QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema),
    ]),
  })
  .strict()
export const QuoteItemCreateOrConnectWithoutEquipmentInputObjectZodSchema = z
  .object({
    where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => QuoteItemCreateWithoutEquipmentInputObjectSchema),
      z.lazy(() => QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema),
    ]),
  })
  .strict()
