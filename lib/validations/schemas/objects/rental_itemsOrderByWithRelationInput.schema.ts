import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { EquipmentOrderByWithRelationInputObjectSchema } from './EquipmentOrderByWithRelationInput.schema';
import { rentalsOrderByWithRelationInputObjectSchema } from './rentalsOrderByWithRelationInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  rentalid: SortOrderSchema.optional(),
  equipmentid: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  priceperday: SortOrderSchema.optional(),
  totaldays: SortOrderSchema.optional(),
  totalprice: SortOrderSchema.optional(),
  createdat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  updatedat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  equipments: z.lazy(() => EquipmentOrderByWithRelationInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const rental_itemsOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.rental_itemsOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsOrderByWithRelationInput>;
export const rental_itemsOrderByWithRelationInputObjectZodSchema = makeSchema();
