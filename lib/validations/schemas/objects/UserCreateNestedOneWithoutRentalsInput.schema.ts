/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { UserCreateWithoutRentalsInputObjectSchema as UserCreateWithoutRentalsInputObjectSchema } from './UserCreateWithoutRentalsInput.schema'
import { UserUncheckedCreateWithoutRentalsInputObjectSchema as UserUncheckedCreateWithoutRentalsInputObjectSchema } from './UserUncheckedCreateWithoutRentalsInput.schema'
import { UserCreateOrConnectWithoutRentalsInputObjectSchema as UserCreateOrConnectWithoutRentalsInputObjectSchema } from './UserCreateOrConnectWithoutRentalsInput.schema'
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutRentalsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutRentalsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutRentalsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict()
export const UserCreateNestedOneWithoutRentalsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRentalsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutRentalsInput>
export const UserCreateNestedOneWithoutRentalsInputObjectZodSchema =
  makeSchema()
