import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'
import { UserUpdateWithoutQuotesInputObjectSchema } from './UserUpdateWithoutQuotesInput.schema'
import { UserUncheckedUpdateWithoutQuotesInputObjectSchema } from './UserUncheckedUpdateWithoutQuotesInput.schema'

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutQuotesInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutQuotesInputObjectSchema),
      ]),
    })
    .strict()
export const UserUpdateToOneWithWhereWithoutQuotesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutQuotesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutQuotesInput>
export const UserUpdateToOneWithWhereWithoutQuotesInputObjectZodSchema =
  makeSchema()
