import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { UserUpdateWithoutQuotesInputObjectSchema } from './UserUpdateWithoutQuotesInput.schema'
import { UserUncheckedUpdateWithoutQuotesInputObjectSchema } from './UserUncheckedUpdateWithoutQuotesInput.schema'
import { UserCreateWithoutQuotesInputObjectSchema } from './UserCreateWithoutQuotesInput.schema'
import { UserUncheckedCreateWithoutQuotesInputObjectSchema } from './UserUncheckedCreateWithoutQuotesInput.schema'
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

export const UserUpsertWithoutQuotesInputObjectSchema: z.ZodType<
  Prisma.UserUpsertWithoutQuotesInput,
  Prisma.UserUpsertWithoutQuotesInput
> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutQuotesInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutQuotesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutQuotesInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutQuotesInputObjectSchema),
    ]),
    where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  })
  .strict()
export const UserUpsertWithoutQuotesInputObjectZodSchema = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutQuotesInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutQuotesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutQuotesInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutQuotesInputObjectSchema),
    ]),
    where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  })
  .strict()
