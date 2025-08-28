import { z } from 'zod'
import type { Prisma } from '@prisma/client'

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
      _all: z.literal(true).optional(),
    })
    .strict()
export const RentalsCountAggregateInputObjectSchema: z.ZodType<Prisma.RentalsCountAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RentalsCountAggregateInputType>
export const RentalsCountAggregateInputObjectZodSchema = makeSchema()
