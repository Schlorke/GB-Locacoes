import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'
import { UserUpdateWithoutRentalsInputObjectSchema } from './UserUpdateWithoutRentalsInput.schema'
import { UserUncheckedUpdateWithoutRentalsInputObjectSchema } from './UserUncheckedUpdateWithoutRentalsInput.schema'

export const UserUpdateToOneWithWhereWithoutRentalsInputObjectSchema: z.ZodType<
  Prisma.UserUpdateToOneWithWhereWithoutRentalsInput,
  Prisma.UserUpdateToOneWithWhereWithoutRentalsInput
> = z
  .object({
    where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    data: z.union([
      z.lazy(() => UserUpdateWithoutRentalsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutRentalsInputObjectSchema),
    ]),
  })
  .strict()
export const UserUpdateToOneWithWhereWithoutRentalsInputObjectZodSchema = z
  .object({
    where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    data: z.union([
      z.lazy(() => UserUpdateWithoutRentalsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutRentalsInputObjectSchema),
    ]),
  })
  .strict()
