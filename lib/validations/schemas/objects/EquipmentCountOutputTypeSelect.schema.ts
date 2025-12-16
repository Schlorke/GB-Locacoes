/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCountOutputTypeCountCartItemsArgsObjectSchema as EquipmentCountOutputTypeCountCartItemsArgsObjectSchema } from './EquipmentCountOutputTypeCountCartItemsArgs.schema';
import { EquipmentCountOutputTypeCountUnitsArgsObjectSchema as EquipmentCountOutputTypeCountUnitsArgsObjectSchema } from './EquipmentCountOutputTypeCountUnitsArgs.schema';
import { EquipmentCountOutputTypeCountMaintenancesArgsObjectSchema as EquipmentCountOutputTypeCountMaintenancesArgsObjectSchema } from './EquipmentCountOutputTypeCountMaintenancesArgs.schema';
import { EquipmentCountOutputTypeCountQuoteItemsArgsObjectSchema as EquipmentCountOutputTypeCountQuoteItemsArgsObjectSchema } from './EquipmentCountOutputTypeCountQuoteItemsArgs.schema';
import { EquipmentCountOutputTypeCountRentalItemsArgsObjectSchema as EquipmentCountOutputTypeCountRentalItemsArgsObjectSchema } from './EquipmentCountOutputTypeCountRentalItemsArgs.schema'

const makeSchema = () => z.object({
  cartItems: z.union([z.boolean(), z.lazy(() => EquipmentCountOutputTypeCountCartItemsArgsObjectSchema)]).optional(),
  units: z.union([z.boolean(), z.lazy(() => EquipmentCountOutputTypeCountUnitsArgsObjectSchema)]).optional(),
  maintenances: z.union([z.boolean(), z.lazy(() => EquipmentCountOutputTypeCountMaintenancesArgsObjectSchema)]).optional(),
  quoteItems: z.union([z.boolean(), z.lazy(() => EquipmentCountOutputTypeCountQuoteItemsArgsObjectSchema)]).optional(),
  rental_items: z.union([z.boolean(), z.lazy(() => EquipmentCountOutputTypeCountRentalItemsArgsObjectSchema)]).optional()
}).strict();
export const EquipmentCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.EquipmentCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCountOutputTypeSelect>;
export const EquipmentCountOutputTypeSelectObjectZodSchema = makeSchema();
