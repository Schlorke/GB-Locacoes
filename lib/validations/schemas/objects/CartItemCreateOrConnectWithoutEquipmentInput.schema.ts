/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema'
import { CartItemCreateWithoutEquipmentInputObjectSchema as CartItemCreateWithoutEquipmentInputObjectSchema } from './CartItemCreateWithoutEquipmentInput.schema'
import { CartItemUncheckedCreateWithoutEquipmentInputObjectSchema as CartItemUncheckedCreateWithoutEquipmentInputObjectSchema } from './CartItemUncheckedCreateWithoutEquipmentInput.schema'

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => CartItemWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CartItemCreateWithoutEquipmentInputObjectSchema),
        z.lazy(() => CartItemUncheckedCreateWithoutEquipmentInputObjectSchema),
      ]),
    })
    .strict()
export const CartItemCreateOrConnectWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.CartItemCreateOrConnectWithoutEquipmentInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateOrConnectWithoutEquipmentInput>
export const CartItemCreateOrConnectWithoutEquipmentInputObjectZodSchema =
  makeSchema()
