import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'
import { UserUpdateWithoutRentalsInputObjectSchema } from './UserUpdateWithoutRentalsInput.schema'
import { UserUncheckedUpdateWithoutRentalsInputObjectSchema } from './UserUncheckedUpdateWithoutRentalsInput.schema'

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutRentalsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutRentalsInputObjectSchema),
      ]),
    })
    .strict()
export const UserUpdateToOneWithWhereWithoutRentalsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRentalsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRentalsInput>
export const UserUpdateToOneWithWhereWithoutRentalsInputObjectZodSchema =
  makeSchema()
