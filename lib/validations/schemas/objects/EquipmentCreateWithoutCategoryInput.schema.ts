import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema } from './QuoteItemCreateNestedManyWithoutEquipmentInput.schema';
import { rental_itemsCreateNestedManyWithoutEquipmentsInputObjectSchema } from './rental_itemsCreateNestedManyWithoutEquipmentsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().nullish(),
  pricePerDay: z.number(),
  images: z.union([z.lazy(() => EquipmentCreateimagesInputObjectSchema), z.string().array()]).optional(),
  available: z.boolean().optional(),
  specifications: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  maxStock: z.number().int().nullish(),
  dailyDiscount: z.number().int().nullish(),
  weeklyDiscount: z.number().int().nullish(),
  biweeklyDiscount: z.number().int().nullish(),
  monthlyDiscount: z.number().int().nullish(),
  popularPeriod: z.string().nullish(),
  dailyDirectValue: z.number().nullish(),
  weeklyDirectValue: z.number().nullish(),
  biweeklyDirectValue: z.number().nullish(),
  monthlyDirectValue: z.number().nullish(),
  dailyUseDirectValue: z.boolean().optional(),
  weeklyUseDirectValue: z.boolean().optional(),
  biweeklyUseDirectValue: z.boolean().optional(),
  monthlyUseDirectValue: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  quoteItems: z.lazy(() => QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema).optional(),
  rental_items: z.lazy(() => rental_itemsCreateNestedManyWithoutEquipmentsInputObjectSchema).optional()
}).strict();
export const EquipmentCreateWithoutCategoryInputObjectSchema: z.ZodType<Prisma.EquipmentCreateWithoutCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateWithoutCategoryInput>;
export const EquipmentCreateWithoutCategoryInputObjectZodSchema = makeSchema();
