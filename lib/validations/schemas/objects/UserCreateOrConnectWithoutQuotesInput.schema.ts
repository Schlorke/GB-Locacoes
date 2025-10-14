/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserCreateWithoutQuotesInputObjectSchema as UserCreateWithoutQuotesInputObjectSchema } from './UserCreateWithoutQuotesInput.schema'
import { UserUncheckedCreateWithoutQuotesInputObjectSchema as UserUncheckedCreateWithoutQuotesInputObjectSchema } from './UserUncheckedCreateWithoutQuotesInput.schema'

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutQuotesInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutQuotesInputObjectSchema),
      ]),
    })
    .strict()
export const UserCreateOrConnectWithoutQuotesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutQuotesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutQuotesInput>
export const UserCreateOrConnectWithoutQuotesInputObjectZodSchema = makeSchema()
