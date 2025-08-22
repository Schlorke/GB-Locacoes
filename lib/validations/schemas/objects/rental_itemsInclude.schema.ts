import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentArgsObjectSchema } from './EquipmentArgs.schema';
import { rentalsArgsObjectSchema } from './rentalsArgs.schema'

export const rental_itemsIncludeObjectSchema: z.ZodType<Prisma.rental_itemsInclude, Prisma.rental_itemsInclude> = z.object({
  equipments: z.union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)]).optional(),
  rentals: z.union([z.boolean(), z.lazy(() => rentalsArgsObjectSchema)]).optional()
}).strict();
export const rental_itemsIncludeObjectZodSchema = z.object({
  equipments: z.union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)]).optional(),
  rentals: z.union([z.boolean(), z.lazy(() => rentalsArgsObjectSchema)]).optional()
}).strict();
