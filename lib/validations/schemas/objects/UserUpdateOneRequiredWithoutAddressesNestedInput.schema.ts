/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { UserCreateWithoutAddressesInputObjectSchema as UserCreateWithoutAddressesInputObjectSchema } from './UserCreateWithoutAddressesInput.schema'
import { UserUncheckedCreateWithoutAddressesInputObjectSchema as UserUncheckedCreateWithoutAddressesInputObjectSchema } from './UserUncheckedCreateWithoutAddressesInput.schema'
import { UserCreateOrConnectWithoutAddressesInputObjectSchema as UserCreateOrConnectWithoutAddressesInputObjectSchema } from './UserCreateOrConnectWithoutAddressesInput.schema'
import { UserUpsertWithoutAddressesInputObjectSchema as UserUpsertWithoutAddressesInputObjectSchema } from './UserUpsertWithoutAddressesInput.schema'
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserUpdateToOneWithWhereWithoutAddressesInputObjectSchema as UserUpdateToOneWithWhereWithoutAddressesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutAddressesInput.schema'
import { UserUpdateWithoutAddressesInputObjectSchema as UserUpdateWithoutAddressesInputObjectSchema } from './UserUpdateWithoutAddressesInput.schema'
import { UserUncheckedUpdateWithoutAddressesInputObjectSchema as UserUncheckedUpdateWithoutAddressesInputObjectSchema } from './UserUncheckedUpdateWithoutAddressesInput.schema'

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutAddressesInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutAddressesInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutAddressesInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutAddressesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => UserUpdateToOneWithWhereWithoutAddressesInputObjectSchema
          ),
          z.lazy(() => UserUpdateWithoutAddressesInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutAddressesInputObjectSchema),
        ])
        .optional(),
    })
    .strict()
export const UserUpdateOneRequiredWithoutAddressesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAddressesNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAddressesNestedInput>
export const UserUpdateOneRequiredWithoutAddressesNestedInputObjectZodSchema =
  makeSchema()
