import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateNestedOneWithoutQuoteItemsInput.schema';
import { QuoteCreateNestedOneWithoutItemsInputObjectSchema } from './QuoteCreateNestedOneWithoutItemsInput.schema'

export const QuoteItemCreateInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateInput, Prisma.QuoteItemCreateInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().int().optional(),
  days: z.number().int().optional(),
  pricePerDay: z.number(),
  total: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  equipment: z.lazy(() => EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutItemsInputObjectSchema)
}).strict();
export const QuoteItemCreateInputObjectZodSchema = z.object({
  id: z.string().optional(),
  quantity: z.number().int().optional(),
  days: z.number().int().optional(),
  pricePerDay: z.number(),
  total: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  equipment: z.lazy(() => EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutItemsInputObjectSchema)
}).strict();
