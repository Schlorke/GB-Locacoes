import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsWhereInputObjectSchema as rental_itemsWhereInputObjectSchema } from './rental_itemsWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rental_itemsWhereInputObjectSchema).optional()
}).strict();
export const EquipmentCountOutputTypeCountRentalItemsArgsObjectSchema = makeSchema();
export const EquipmentCountOutputTypeCountRentalItemsArgsObjectZodSchema = makeSchema();
