import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const UserCountOutputTypeSelectObjectSchema: z.ZodType<
  Prisma.UserCountOutputTypeSelect,
  Prisma.UserCountOutputTypeSelect
> = z
  .object({
    accounts: z.boolean().optional(),
    quotes: z.boolean().optional(),
    rentals: z.boolean().optional(),
    sessions: z.boolean().optional(),
  })
  .strict()
export const UserCountOutputTypeSelectObjectZodSchema = z
  .object({
    accounts: z.boolean().optional(),
    quotes: z.boolean().optional(),
    rentals: z.boolean().optional(),
    sessions: z.boolean().optional(),
  })
  .strict()
