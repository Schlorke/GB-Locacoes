import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemFindManySchema as CartItemFindManySchema } from '../findManyCartItem.schema';
import { EquipmentUnitFindManySchema as EquipmentUnitFindManySchema } from '../findManyEquipmentUnit.schema';
import { CategoryArgsObjectSchema as CategoryArgsObjectSchema } from './CategoryArgs.schema';
import { MaintenanceFindManySchema as MaintenanceFindManySchema } from '../findManyMaintenance.schema';
import { QuoteItemFindManySchema as QuoteItemFindManySchema } from '../findManyQuoteItem.schema';
import { rental_itemsFindManySchema as rental_itemsFindManySchema } from '../findManyrental_items.schema';
import { EquipmentCountOutputTypeArgsObjectSchema as EquipmentCountOutputTypeArgsObjectSchema } from './EquipmentCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  cartItems: z.union([z.boolean(), z.lazy(() => CartItemFindManySchema)]).optional(),
  units: z.union([z.boolean(), z.lazy(() => EquipmentUnitFindManySchema)]).optional(),
  category: z.union([z.boolean(), z.lazy(() => CategoryArgsObjectSchema)]).optional(),
  maintenances: z.union([z.boolean(), z.lazy(() => MaintenanceFindManySchema)]).optional(),
  quoteItems: z.union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)]).optional(),
  rental_items: z.union([z.boolean(), z.lazy(() => rental_itemsFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => EquipmentCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const EquipmentIncludeObjectSchema: z.ZodType<Prisma.EquipmentInclude> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentInclude>;
export const EquipmentIncludeObjectZodSchema = makeSchema();
