import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema } from './CategoryCreateNestedOneWithoutEquipmentsInput.schema';
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
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema),
  quoteItems: z.lazy(() => QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema).optional(),
  rental_items: z.lazy(() => rental_itemsCreateNestedManyWithoutEquipmentsInputObjectSchema).optional()
}).strict();
export const EquipmentCreateInputObjectSchema: z.ZodType<Prisma.EquipmentCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateInput>;
export const EquipmentCreateInputObjectZodSchema = makeSchema();
