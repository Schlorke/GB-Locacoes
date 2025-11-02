import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentArgsObjectSchema as EquipmentArgsObjectSchema } from './EquipmentArgs.schema';
import { QuoteArgsObjectSchema as QuoteArgsObjectSchema } from './QuoteArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  quoteId: z.boolean().optional(),
  equipmentId: z.boolean().optional(),
  quantity: z.boolean().optional(),
  days: z.boolean().optional(),
  pricePerDay: z.boolean().optional(),
  total: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  equipment: z.union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)]).optional(),
  quote: z.union([z.boolean(), z.lazy(() => QuoteArgsObjectSchema)]).optional()
}).strict();
export const QuoteItemSelectObjectSchema: z.ZodType<Prisma.QuoteItemSelect> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemSelect>;
export const QuoteItemSelectObjectZodSchema = makeSchema();
