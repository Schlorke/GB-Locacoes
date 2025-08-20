import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { UserCreateWithoutQuotesInputObjectSchema } from './UserCreateWithoutQuotesInput.schema'
import { UserUncheckedCreateWithoutQuotesInputObjectSchema } from './UserUncheckedCreateWithoutQuotesInput.schema'
import { UserCreateOrConnectWithoutQuotesInputObjectSchema } from './UserCreateOrConnectWithoutQuotesInput.schema'
import { UserUpsertWithoutQuotesInputObjectSchema } from './UserUpsertWithoutQuotesInput.schema'
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserUpdateToOneWithWhereWithoutQuotesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutQuotesInput.schema'
import { UserUpdateWithoutQuotesInputObjectSchema } from './UserUpdateWithoutQuotesInput.schema'
import { UserUncheckedUpdateWithoutQuotesInputObjectSchema } from './UserUncheckedUpdateWithoutQuotesInput.schema'

export const UserUpdateOneWithoutQuotesNestedInputObjectSchema: z.ZodType<
  Prisma.UserUpdateOneWithoutQuotesNestedInput,
  Prisma.UserUpdateOneWithoutQuotesNestedInput
> = z
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
export const UserUpdateOneWithoutQuotesNestedInputObjectZodSchema = z
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
