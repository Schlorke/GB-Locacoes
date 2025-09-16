import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  pricePerDay: z.number(),
  images: z.union([z.lazy(() => EquipmentCreateimagesInputObjectSchema), z.string().array()]).optional(),
  available: z.boolean().optional(),
  categoryId: z.string(),
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
  updatedAt: z.coerce.date().optional(),
  rental_items: z.lazy(() => rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInputObjectSchema).optional()
}).strict();
export const EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema: z.ZodType<Prisma.EquipmentUncheckedCreateWithoutQuoteItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUncheckedCreateWithoutQuoteItemsInput>;
export const EquipmentUncheckedCreateWithoutQuoteItemsInputObjectZodSchema = makeSchema();
