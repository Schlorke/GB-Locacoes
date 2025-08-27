import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserCreateWithoutQuotesInputObjectSchema } from './UserCreateWithoutQuotesInput.schema'
import { UserUncheckedCreateWithoutQuotesInputObjectSchema } from './UserUncheckedCreateWithoutQuotesInput.schema'

const makeSchema = (): z.ZodObject<any> =>
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
