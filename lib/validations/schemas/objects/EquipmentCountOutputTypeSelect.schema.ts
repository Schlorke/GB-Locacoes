import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCountOutputTypeCountQuoteItemsArgsObjectSchema as EquipmentCountOutputTypeCountQuoteItemsArgsObjectSchema } from './EquipmentCountOutputTypeCountQuoteItemsArgs.schema';
import { EquipmentCountOutputTypeCountRentalItemsArgsObjectSchema as EquipmentCountOutputTypeCountRentalItemsArgsObjectSchema } from './EquipmentCountOutputTypeCountRentalItemsArgs.schema';
import { EquipmentCountOutputTypeCountCartItemsArgsObjectSchema as EquipmentCountOutputTypeCountCartItemsArgsObjectSchema } from './EquipmentCountOutputTypeCountCartItemsArgs.schema'

const makeSchema = () => z.object({
  quoteItems: z.union([z.boolean(), z.lazy(() => EquipmentCountOutputTypeCountQuoteItemsArgsObjectSchema)]).optional(),
  rental_items: z.union([z.boolean(), z.lazy(() => EquipmentCountOutputTypeCountRentalItemsArgsObjectSchema)]).optional(),
  cartItems: z.union([z.boolean(), z.lazy(() => EquipmentCountOutputTypeCountCartItemsArgsObjectSchema)]).optional()
}).strict();
export const EquipmentCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.EquipmentCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCountOutputTypeSelect>;
export const EquipmentCountOutputTypeSelectObjectZodSchema = makeSchema();
