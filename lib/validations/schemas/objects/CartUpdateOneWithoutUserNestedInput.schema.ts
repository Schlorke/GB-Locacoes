/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { CartCreateWithoutUserInputObjectSchema as CartCreateWithoutUserInputObjectSchema } from './CartCreateWithoutUserInput.schema'
import { CartUncheckedCreateWithoutUserInputObjectSchema as CartUncheckedCreateWithoutUserInputObjectSchema } from './CartUncheckedCreateWithoutUserInput.schema'
import { CartCreateOrConnectWithoutUserInputObjectSchema as CartCreateOrConnectWithoutUserInputObjectSchema } from './CartCreateOrConnectWithoutUserInput.schema'
import { CartUpsertWithoutUserInputObjectSchema as CartUpsertWithoutUserInputObjectSchema } from './CartUpsertWithoutUserInput.schema'
import { CartWhereInputObjectSchema as CartWhereInputObjectSchema } from './CartWhereInput.schema'
import { CartWhereUniqueInputObjectSchema as CartWhereUniqueInputObjectSchema } from './CartWhereUniqueInput.schema'
import { CartUpdateToOneWithWhereWithoutUserInputObjectSchema as CartUpdateToOneWithWhereWithoutUserInputObjectSchema } from './CartUpdateToOneWithWhereWithoutUserInput.schema'
import { CartUpdateWithoutUserInputObjectSchema as CartUpdateWithoutUserInputObjectSchema } from './CartUpdateWithoutUserInput.schema'
import { CartUncheckedUpdateWithoutUserInputObjectSchema as CartUncheckedUpdateWithoutUserInputObjectSchema } from './CartUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => CartCreateWithoutUserInputObjectSchema),
          z.lazy(() => CartUncheckedCreateWithoutUserInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CartCreateOrConnectWithoutUserInputObjectSchema)
        .optional(),
      upsert: z.lazy(() => CartUpsertWithoutUserInputObjectSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => CartWhereInputObjectSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => CartWhereInputObjectSchema)])
        .optional(),
      connect: z.lazy(() => CartWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => CartUpdateToOneWithWhereWithoutUserInputObjectSchema),
          z.lazy(() => CartUpdateWithoutUserInputObjectSchema),
          z.lazy(() => CartUncheckedUpdateWithoutUserInputObjectSchema),
        ])
        .optional(),
    })
    .strict()
export const CartUpdateOneWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.CartUpdateOneWithoutUserNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CartUpdateOneWithoutUserNestedInput>
export const CartUpdateOneWithoutUserNestedInputObjectZodSchema = makeSchema()
