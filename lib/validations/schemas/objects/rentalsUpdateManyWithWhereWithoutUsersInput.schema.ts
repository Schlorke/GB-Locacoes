import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { rentalsScalarWhereInputObjectSchema } from './rentalsScalarWhereInput.schema'
import { rentalsUpdateManyMutationInputObjectSchema } from './rentalsUpdateManyMutationInput.schema'
import { rentalsUncheckedUpdateManyWithoutUsersInputObjectSchema } from './rentalsUncheckedUpdateManyWithoutUsersInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      where: z.lazy(() => rentalsScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => rentalsUpdateManyMutationInputObjectSchema),
        z.lazy(() => rentalsUncheckedUpdateManyWithoutUsersInputObjectSchema),
      ]),
    })
    .strict()
export const rentalsUpdateManyWithWhereWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsUpdateManyWithWhereWithoutUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateManyWithWhereWithoutUsersInput>
export const rentalsUpdateManyWithWhereWithoutUsersInputObjectZodSchema =
  makeSchema()
