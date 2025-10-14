/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { UserCreateWithoutQuotesInputObjectSchema as UserCreateWithoutQuotesInputObjectSchema } from './UserCreateWithoutQuotesInput.schema'
import { UserUncheckedCreateWithoutQuotesInputObjectSchema as UserUncheckedCreateWithoutQuotesInputObjectSchema } from './UserUncheckedCreateWithoutQuotesInput.schema'
import { UserCreateOrConnectWithoutQuotesInputObjectSchema as UserCreateOrConnectWithoutQuotesInputObjectSchema } from './UserCreateOrConnectWithoutQuotesInput.schema'
import { UserUpsertWithoutQuotesInputObjectSchema as UserUpsertWithoutQuotesInputObjectSchema } from './UserUpsertWithoutQuotesInput.schema'
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserUpdateToOneWithWhereWithoutQuotesInputObjectSchema as UserUpdateToOneWithWhereWithoutQuotesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutQuotesInput.schema'
import { UserUpdateWithoutQuotesInputObjectSchema as UserUpdateWithoutQuotesInputObjectSchema } from './UserUpdateWithoutQuotesInput.schema'
import { UserUncheckedUpdateWithoutQuotesInputObjectSchema as UserUncheckedUpdateWithoutQuotesInputObjectSchema } from './UserUncheckedUpdateWithoutQuotesInput.schema'

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutQuotesInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutQuotesInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutQuotesInputObjectSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutQuotesInputObjectSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)])
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutQuotesInputObjectSchema),
          z.lazy(() => UserUpdateWithoutQuotesInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutQuotesInputObjectSchema),
        ])
        .optional(),
    })
    .strict()
export const UserUpdateOneWithoutQuotesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutQuotesNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutQuotesNestedInput>
export const UserUpdateOneWithoutQuotesNestedInputObjectZodSchema = makeSchema()
