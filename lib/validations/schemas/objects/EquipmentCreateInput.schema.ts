/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateimagesInputObjectSchema as EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema as CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema } from './CategoryCreateNestedOneWithoutEquipmentsInput.schema';
import { QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema as QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema } from './QuoteItemCreateNestedManyWithoutEquipmentInput.schema';
import { rental_itemsCreateNestedManyWithoutEquipmentsInputObjectSchema as rental_itemsCreateNestedManyWithoutEquipmentsInputObjectSchema } from './rental_itemsCreateNestedManyWithoutEquipmentsInput.schema';
import { CartItemCreateNestedManyWithoutEquipmentInputObjectSchema as CartItemCreateNestedManyWithoutEquipmentInputObjectSchema } from './CartItemCreateNestedManyWithoutEquipmentInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  pricePerDay: z.number(),
  images: z.union([z.lazy(() => EquipmentCreateimagesInputObjectSchema), z.string().array()]),
  available: z.boolean().optional(),
  specifications: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  maxStock: z.number().int().optional().nullable(),
  dailyDiscount: z.number().int().optional().nullable(),
  weeklyDiscount: z.number().int().optional().nullable(),
  biweeklyDiscount: z.number().int().optional().nullable(),
  monthlyDiscount: z.number().int().optional().nullable(),
  popularPeriod: z.string().optional().nullable(),
  dailyDirectValue: z.number().optional().nullable(),
  weeklyDirectValue: z.number().optional().nullable(),
  biweeklyDirectValue: z.number().optional().nullable(),
  monthlyDirectValue: z.number().optional().nullable(),
  dailyUseDirectValue: z.boolean().optional(),
  weeklyUseDirectValue: z.boolean().optional(),
  biweeklyUseDirectValue: z.boolean().optional(),
  monthlyUseDirectValue: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema),
  quoteItems: z.lazy(() => QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema),
  rental_items: z.lazy(() => rental_itemsCreateNestedManyWithoutEquipmentsInputObjectSchema),
  cartItems: z.lazy(() => CartItemCreateNestedManyWithoutEquipmentInputObjectSchema)
}).strict();
export const EquipmentCreateInputObjectSchema: z.ZodType<Prisma.EquipmentCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateInput>;
export const EquipmentCreateInputObjectZodSchema = makeSchema();
