import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      quoteItems: z.boolean().optional(),
      rental_items: z.boolean().optional(),
    })
    .strict()
export const EquipmentCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.EquipmentCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentCountOutputTypeSelect>
export const EquipmentCountOutputTypeSelectObjectZodSchema = makeSchema()
