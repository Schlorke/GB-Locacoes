import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentArgsObjectSchema as EquipmentArgsObjectSchema } from './EquipmentArgs.schema';
import { rentalsArgsObjectSchema as rentalsArgsObjectSchema } from './rentalsArgs.schema'

const makeSchema = () => z.object({
  equipments: z.union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)]).optional(),
  rentals: z.union([z.boolean(), z.lazy(() => rentalsArgsObjectSchema)]).optional()
}).strict();
export const rental_itemsIncludeObjectSchema: z.ZodType<Prisma.rental_itemsInclude> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsInclude>;
export const rental_itemsIncludeObjectZodSchema = makeSchema();
