import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema';
import { CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema } from './CategoryCreateNestedOneWithoutEquipmentsInput.schema';
import { rental_itemsCreateNestedManyWithoutEquipmentsInputObjectSchema } from './rental_itemsCreateNestedManyWithoutEquipmentsInput.schema'

export const EquipmentCreateWithoutQuoteItemsInputObjectSchema: z.ZodType<Prisma.EquipmentCreateWithoutQuoteItemsInput, Prisma.EquipmentCreateWithoutQuoteItemsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  pricePerDay: z.number(),
  images: z.union([z.lazy(() => EquipmentCreateimagesInputObjectSchema), z.string().array()]).optional(),
  available: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  category_id: z.string().optional().nullable(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema),
  rental_items: z.lazy(() => rental_itemsCreateNestedManyWithoutEquipmentsInputObjectSchema).optional()
}).strict();
export const EquipmentCreateWithoutQuoteItemsInputObjectZodSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  pricePerDay: z.number(),
  images: z.union([z.lazy(() => EquipmentCreateimagesInputObjectSchema), z.string().array()]).optional(),
  available: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  category_id: z.string().optional().nullable(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema),
  rental_items: z.lazy(() => rental_itemsCreateNestedManyWithoutEquipmentsInputObjectSchema).optional()
}).strict();
