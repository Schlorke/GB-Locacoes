import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema';
import { rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().nullish(),
  pricePerDay: z.number(),
  images: z.union([z.lazy(() => EquipmentCreateimagesInputObjectSchema), z.string().array()]).optional(),
  available: z.boolean().optional(),
  categoryId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  category_id: z.string().nullish(),
  rental_items: z.lazy(() => rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInputObjectSchema).optional()
}).strict();
export const EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema: z.ZodType<Prisma.EquipmentUncheckedCreateWithoutQuoteItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUncheckedCreateWithoutQuoteItemsInput>;
export const EquipmentUncheckedCreateWithoutQuoteItemsInputObjectZodSchema = makeSchema();
