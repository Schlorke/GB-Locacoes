import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { rental_itemsFindManySchema } from '../findManyrental_items.schema'
import { UserArgsObjectSchema } from './UserArgs.schema'
import { RentalsCountOutputTypeArgsObjectSchema } from './RentalsCountOutputTypeArgs.schema'

const makeSchema = () =>
  z
    .object({
      rental_items: z
        .union([z.boolean(), z.lazy(() => rental_itemsFindManySchema)])
        .optional(),
      users: z
        .union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => RentalsCountOutputTypeArgsObjectSchema),
        ])
        .optional(),
    })
    .strict()
export const rentalsIncludeObjectSchema: z.ZodType<Prisma.rentalsInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsInclude>
export const rentalsIncludeObjectZodSchema = makeSchema()
