import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.literal(true).optional(),
      startdate: z.literal(true).optional(),
      enddate: z.literal(true).optional(),
      total: z.literal(true).optional(),
      status: z.literal(true).optional(),
      userid: z.literal(true).optional(),
      createdat: z.literal(true).optional(),
      updatedat: z.literal(true).optional(),
    })
    .strict()
export const RentalsMaxAggregateInputObjectSchema: z.ZodType<Prisma.RentalsMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RentalsMaxAggregateInputType>
export const RentalsMaxAggregateInputObjectZodSchema = makeSchema()
