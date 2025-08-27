import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      every: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
      some: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
      none: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
    })
    .strict()
export const EquipmentListRelationFilterObjectSchema: z.ZodType<Prisma.EquipmentListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentListRelationFilter>
export const EquipmentListRelationFilterObjectZodSchema = makeSchema()
