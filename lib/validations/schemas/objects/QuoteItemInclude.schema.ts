import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentArgsObjectSchema } from './EquipmentArgs.schema';
import { QuoteArgsObjectSchema } from './QuoteArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equipment: z.union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)]).optional(),
  quote: z.union([z.boolean(), z.lazy(() => QuoteArgsObjectSchema)]).optional()
}).strict();
export const QuoteItemIncludeObjectSchema: z.ZodType<Prisma.QuoteItemInclude> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemInclude>;
export const QuoteItemIncludeObjectZodSchema = makeSchema();
