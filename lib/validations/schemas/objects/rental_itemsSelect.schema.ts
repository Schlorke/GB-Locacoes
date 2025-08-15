import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentArgsObjectSchema } from './EquipmentArgs.schema';
import { rentalsArgsObjectSchema } from './rentalsArgs.schema'

export const rental_itemsSelectObjectSchema: z.ZodType<Prisma.rental_itemsSelect, Prisma.rental_itemsSelect> = z.object({
  id: z.boolean().optional(),
  rentalid: z.boolean().optional(),
  equipmentid: z.boolean().optional(),
  quantity: z.boolean().optional(),
  priceperday: z.boolean().optional(),
  totaldays: z.boolean().optional(),
  totalprice: z.boolean().optional(),
  createdat: z.boolean().optional(),
  updatedat: z.boolean().optional(),
  equipments: z.union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)]).optional(),
  rentals: z.union([z.boolean(), z.lazy(() => rentalsArgsObjectSchema)]).optional()
}).strict();
export const rental_itemsSelectObjectZodSchema = z.object({
  id: z.boolean().optional(),
  rentalid: z.boolean().optional(),
  equipmentid: z.boolean().optional(),
  quantity: z.boolean().optional(),
  priceperday: z.boolean().optional(),
  totaldays: z.boolean().optional(),
  totalprice: z.boolean().optional(),
  createdat: z.boolean().optional(),
  updatedat: z.boolean().optional(),
  equipments: z.union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)]).optional(),
  rentals: z.union([z.boolean(), z.lazy(() => rentalsArgsObjectSchema)]).optional()
}).strict();
