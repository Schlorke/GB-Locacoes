import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { RentalsCountOutputTypeSelectObjectSchema } from './RentalsCountOutputTypeSelect.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      select: z.lazy(() => RentalsCountOutputTypeSelectObjectSchema).optional(),
    })
    .strict()
export const RentalsCountOutputTypeArgsObjectSchema = makeSchema()
export const RentalsCountOutputTypeArgsObjectZodSchema = makeSchema()
