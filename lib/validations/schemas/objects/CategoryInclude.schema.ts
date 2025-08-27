import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentFindManySchema } from '../findManyEquipment.schema'
import { CategoryCountOutputTypeArgsObjectSchema } from './CategoryCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      equipments: z
        .union([z.boolean(), z.lazy(() => EquipmentFindManySchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => CategoryCountOutputTypeArgsObjectSchema),
        ])
        .optional(),
    })
    .strict()
export const CategoryIncludeObjectSchema: z.ZodType<Prisma.CategoryInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.CategoryInclude>
export const CategoryIncludeObjectZodSchema = makeSchema()
