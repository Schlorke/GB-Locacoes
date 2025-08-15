import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { EquipmentOrderByWithRelationInputObjectSchema } from './EquipmentOrderByWithRelationInput.schema'
import { rentalsOrderByWithRelationInputObjectSchema } from './rentalsOrderByWithRelationInput.schema'

export const rental_itemsOrderByWithRelationInputObjectSchema: z.ZodType<
  Prisma.rental_itemsOrderByWithRelationInput,
  Prisma.rental_itemsOrderByWithRelationInput
> = z
  .object({
    id: SortOrderSchema.optional(),
    rentalid: SortOrderSchema.optional(),
    equipmentid: SortOrderSchema.optional(),
    quantity: SortOrderSchema.optional(),
    priceperday: SortOrderSchema.optional(),
    totaldays: SortOrderSchema.optional(),
    totalprice: SortOrderSchema.optional(),
    createdat: z
      .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    updatedat: z
      .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    equipments: z
      .lazy(() => EquipmentOrderByWithRelationInputObjectSchema)
      .optional(),
    rentals: z
      .lazy(() => rentalsOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict()
export const rental_itemsOrderByWithRelationInputObjectZodSchema = z
  .object({
    id: SortOrderSchema.optional(),
    rentalid: SortOrderSchema.optional(),
    equipmentid: SortOrderSchema.optional(),
    quantity: SortOrderSchema.optional(),
    priceperday: SortOrderSchema.optional(),
    totaldays: SortOrderSchema.optional(),
    totalprice: SortOrderSchema.optional(),
    createdat: z
      .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    updatedat: z
      .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    equipments: z
      .lazy(() => EquipmentOrderByWithRelationInputObjectSchema)
      .optional(),
    rentals: z
      .lazy(() => rentalsOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict()
