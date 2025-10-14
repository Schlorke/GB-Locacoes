/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { CartItemScalarWhereInputObjectSchema as CartItemScalarWhereInputObjectSchema } from './CartItemScalarWhereInput.schema'
import { CartItemUpdateManyMutationInputObjectSchema as CartItemUpdateManyMutationInputObjectSchema } from './CartItemUpdateManyMutationInput.schema'
import { CartItemUncheckedUpdateManyWithoutEquipmentInputObjectSchema as CartItemUncheckedUpdateManyWithoutEquipmentInputObjectSchema } from './CartItemUncheckedUpdateManyWithoutEquipmentInput.schema'

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => CartItemScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CartItemUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => CartItemUncheckedUpdateManyWithoutEquipmentInputObjectSchema
        ),
      ]),
    })
    .strict()
export const CartItemUpdateManyWithWhereWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.CartItemUpdateManyWithWhereWithoutEquipmentInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CartItemUpdateManyWithWhereWithoutEquipmentInput>
export const CartItemUpdateManyWithWhereWithoutEquipmentInputObjectZodSchema =
  makeSchema()
