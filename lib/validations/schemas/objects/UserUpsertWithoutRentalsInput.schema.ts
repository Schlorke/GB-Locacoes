import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { UserUpdateWithoutRentalsInputObjectSchema } from './UserUpdateWithoutRentalsInput.schema'
import { UserUncheckedUpdateWithoutRentalsInputObjectSchema } from './UserUncheckedUpdateWithoutRentalsInput.schema'
import { UserCreateWithoutRentalsInputObjectSchema } from './UserCreateWithoutRentalsInput.schema'
import { UserUncheckedCreateWithoutRentalsInputObjectSchema } from './UserUncheckedCreateWithoutRentalsInput.schema'
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

export const UserUpsertWithoutRentalsInputObjectSchema: z.ZodType<
  Prisma.UserUpsertWithoutRentalsInput,
  Prisma.UserUpsertWithoutRentalsInput
> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutRentalsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutRentalsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutRentalsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutRentalsInputObjectSchema),
    ]),
    where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  })
  .strict()
export const UserUpsertWithoutRentalsInputObjectZodSchema = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutRentalsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutRentalsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutRentalsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutRentalsInputObjectSchema),
    ]),
    where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  })
  .strict()
