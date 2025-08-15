import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rental_itemsSelectObjectSchema } from './rental_itemsSelect.schema'
import { rental_itemsIncludeObjectSchema } from './rental_itemsInclude.schema'

export const rental_itemsArgsObjectSchema = z
  .object({
    select: z.lazy(() => rental_itemsSelectObjectSchema).optional(),
    include: z.lazy(() => rental_itemsIncludeObjectSchema).optional(),
  })
  .strict()
export const rental_itemsArgsObjectZodSchema = z
  .object({
    select: z.lazy(() => rental_itemsSelectObjectSchema).optional(),
    include: z.lazy(() => rental_itemsIncludeObjectSchema).optional(),
  })
  .strict()
