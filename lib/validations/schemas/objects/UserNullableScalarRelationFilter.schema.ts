import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      is: z.lazy(() => UserWhereInputObjectSchema).nullish(),
      isNot: z.lazy(() => UserWhereInputObjectSchema).nullish(),
    })
    .strict()
export const UserNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.UserNullableScalarRelationFilter>
export const UserNullableScalarRelationFilterObjectZodSchema = makeSchema()
