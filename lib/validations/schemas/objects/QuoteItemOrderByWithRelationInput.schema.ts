import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { EquipmentOrderByWithRelationInputObjectSchema } from './EquipmentOrderByWithRelationInput.schema';
import { QuoteOrderByWithRelationInputObjectSchema } from './QuoteOrderByWithRelationInput.schema'

export const QuoteItemOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.QuoteItemOrderByWithRelationInput, Prisma.QuoteItemOrderByWithRelationInput> = z.object({
  id: SortOrderSchema.optional(),
  quoteId: SortOrderSchema.optional(),
  equipmentId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  days: SortOrderSchema.optional(),
  pricePerDay: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  equipment: z.lazy(() => EquipmentOrderByWithRelationInputObjectSchema).optional(),
  quote: z.lazy(() => QuoteOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const QuoteItemOrderByWithRelationInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  quoteId: SortOrderSchema.optional(),
  equipmentId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  days: SortOrderSchema.optional(),
  pricePerDay: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  equipment: z.lazy(() => EquipmentOrderByWithRelationInputObjectSchema).optional(),
  quote: z.lazy(() => QuoteOrderByWithRelationInputObjectSchema).optional()
}).strict();
