import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { UserUpdateWithoutAccountsInputObjectSchema } from './UserUpdateWithoutAccountsInput.schema'
import { UserUncheckedUpdateWithoutAccountsInputObjectSchema } from './UserUncheckedUpdateWithoutAccountsInput.schema'
import { UserCreateWithoutAccountsInputObjectSchema } from './UserCreateWithoutAccountsInput.schema'
import { UserUncheckedCreateWithoutAccountsInputObjectSchema } from './UserUncheckedCreateWithoutAccountsInput.schema'
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

export const UserUpsertWithoutAccountsInputObjectSchema: z.ZodType<
  Prisma.UserUpsertWithoutAccountsInput,
  Prisma.UserUpsertWithoutAccountsInput
> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutAccountsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAccountsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutAccountsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutAccountsInputObjectSchema),
    ]),
    where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  })
  .strict()
export const UserUpsertWithoutAccountsInputObjectZodSchema = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutAccountsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAccountsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutAccountsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutAccountsInputObjectSchema),
    ]),
    where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  })
  .strict()
