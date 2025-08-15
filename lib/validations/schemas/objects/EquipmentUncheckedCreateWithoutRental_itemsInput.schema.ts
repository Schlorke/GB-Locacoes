import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema';
import { QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedCreateNestedManyWithoutEquipmentInput.schema'

export const EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.EquipmentUncheckedCreateWithoutRental_itemsInput, Prisma.EquipmentUncheckedCreateWithoutRental_itemsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  pricePerDay: z.number(),
  images: z.union([z.lazy(() => EquipmentCreateimagesInputObjectSchema), z.string().array()]).optional(),
  available: z.boolean().optional(),
  categoryId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  category_id: z.string().optional().nullable(),
  quoteItems: z.lazy(() => QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema).optional()
}).strict();
export const EquipmentUncheckedCreateWithoutRental_itemsInputObjectZodSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  pricePerDay: z.number(),
  images: z.union([z.lazy(() => EquipmentCreateimagesInputObjectSchema), z.string().array()]).optional(),
  available: z.boolean().optional(),
  categoryId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  category_id: z.string().optional().nullable(),
  quoteItems: z.lazy(() => QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema).optional()
}).strict();
