import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserCreateWithoutQuotesInputObjectSchema } from './UserCreateWithoutQuotesInput.schema'
import { UserUncheckedCreateWithoutQuotesInputObjectSchema } from './UserUncheckedCreateWithoutQuotesInput.schema'

export const UserCreateOrConnectWithoutQuotesInputObjectSchema: z.ZodType<
  Prisma.UserCreateOrConnectWithoutQuotesInput,
  Prisma.UserCreateOrConnectWithoutQuotesInput
> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutQuotesInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutQuotesInputObjectSchema),
    ]),
  })
  .strict()
export const UserCreateOrConnectWithoutQuotesInputObjectZodSchema = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutQuotesInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutQuotesInputObjectSchema),
    ]),
  })
  .strict()
