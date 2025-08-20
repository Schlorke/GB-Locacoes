import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { RentalsCountOutputTypeSelectObjectSchema } from './RentalsCountOutputTypeSelect.schema'

export const RentalsCountOutputTypeArgsObjectSchema = z
  .object({
    select: z.lazy(() => RentalsCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict()
export const RentalsCountOutputTypeArgsObjectZodSchema = z
  .object({
    select: z.lazy(() => RentalsCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict()
