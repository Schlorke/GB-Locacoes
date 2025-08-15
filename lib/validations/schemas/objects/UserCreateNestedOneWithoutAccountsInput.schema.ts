import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { UserCreateWithoutAccountsInputObjectSchema } from './UserCreateWithoutAccountsInput.schema'
import { UserUncheckedCreateWithoutAccountsInputObjectSchema } from './UserUncheckedCreateWithoutAccountsInput.schema'
import { UserCreateOrConnectWithoutAccountsInputObjectSchema } from './UserCreateOrConnectWithoutAccountsInput.schema'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

export const UserCreateNestedOneWithoutAccountsInputObjectSchema: z.ZodType<
  Prisma.UserCreateNestedOneWithoutAccountsInput,
  Prisma.UserCreateNestedOneWithoutAccountsInput
> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAccountsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutAccountsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict()
export const UserCreateNestedOneWithoutAccountsInputObjectZodSchema = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAccountsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutAccountsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict()
