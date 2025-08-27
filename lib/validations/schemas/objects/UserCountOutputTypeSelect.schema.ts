import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      accounts: z.boolean().optional(),
      quotes: z.boolean().optional(),
      rentals: z.boolean().optional(),
      sessions: z.boolean().optional(),
    })
    .strict()
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema()
