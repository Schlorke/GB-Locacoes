import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserCreateWithoutRentalsInputObjectSchema } from './UserCreateWithoutRentalsInput.schema'
import { UserUncheckedCreateWithoutRentalsInputObjectSchema } from './UserUncheckedCreateWithoutRentalsInput.schema'

export const UserCreateOrConnectWithoutRentalsInputObjectSchema: z.ZodType<
  Prisma.UserCreateOrConnectWithoutRentalsInput,
  Prisma.UserCreateOrConnectWithoutRentalsInput
> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutRentalsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutRentalsInputObjectSchema),
    ]),
  })
  .strict()
export const UserCreateOrConnectWithoutRentalsInputObjectZodSchema = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutRentalsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutRentalsInputObjectSchema),
    ]),
  })
  .strict()
