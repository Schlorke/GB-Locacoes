import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string(),
      startdate: z.date(),
      enddate: z.date(),
      total: z.number(),
      status: z.string().nullish(),
      createdat: z.date().nullish(),
      updatedat: z.date().nullish(),
    })
    .strict()
export const rentalsCreateManyUsersInputObjectSchema: z.ZodType<Prisma.rentalsCreateManyUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateManyUsersInput>
export const rentalsCreateManyUsersInputObjectZodSchema = makeSchema()
