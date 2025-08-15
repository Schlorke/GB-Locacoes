import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema'
import { rentalsUpdateWithoutUsersInputObjectSchema } from './rentalsUpdateWithoutUsersInput.schema'
import { rentalsUncheckedUpdateWithoutUsersInputObjectSchema } from './rentalsUncheckedUpdateWithoutUsersInput.schema'

export const rentalsUpdateWithWhereUniqueWithoutUsersInputObjectSchema: z.ZodType<
  Prisma.rentalsUpdateWithWhereUniqueWithoutUsersInput,
  Prisma.rentalsUpdateWithWhereUniqueWithoutUsersInput
> = z
  .object({
    where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => rentalsUpdateWithoutUsersInputObjectSchema),
      z.lazy(() => rentalsUncheckedUpdateWithoutUsersInputObjectSchema),
    ]),
  })
  .strict()
export const rentalsUpdateWithWhereUniqueWithoutUsersInputObjectZodSchema = z
  .object({
    where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => rentalsUpdateWithoutUsersInputObjectSchema),
      z.lazy(() => rentalsUncheckedUpdateWithoutUsersInputObjectSchema),
    ]),
  })
  .strict()
