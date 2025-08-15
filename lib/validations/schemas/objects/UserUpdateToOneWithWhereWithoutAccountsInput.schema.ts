import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'
import { UserUpdateWithoutAccountsInputObjectSchema } from './UserUpdateWithoutAccountsInput.schema'
import { UserUncheckedUpdateWithoutAccountsInputObjectSchema } from './UserUncheckedUpdateWithoutAccountsInput.schema'

export const UserUpdateToOneWithWhereWithoutAccountsInputObjectSchema: z.ZodType<
  Prisma.UserUpdateToOneWithWhereWithoutAccountsInput,
  Prisma.UserUpdateToOneWithWhereWithoutAccountsInput
> = z
  .object({
    where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    data: z.union([
      z.lazy(() => UserUpdateWithoutAccountsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAccountsInputObjectSchema),
    ]),
  })
  .strict()
export const UserUpdateToOneWithWhereWithoutAccountsInputObjectZodSchema = z
  .object({
    where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    data: z.union([
      z.lazy(() => UserUpdateWithoutAccountsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAccountsInputObjectSchema),
    ]),
  })
  .strict()
