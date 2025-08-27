import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { EquipmentOrderByRelationAggregateInputObjectSchema } from './EquipmentOrderByRelationAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      description: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      icon: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      iconColor: SortOrderSchema.optional(),
      bgColor: SortOrderSchema.optional(),
      fontColor: SortOrderSchema.optional(),
      slug: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      equipments: z
        .lazy(() => EquipmentOrderByRelationAggregateInputObjectSchema)
        .optional(),
    })
    .strict()
export const CategoryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CategoryOrderByWithRelationInput>
export const CategoryOrderByWithRelationInputObjectZodSchema = makeSchema()
