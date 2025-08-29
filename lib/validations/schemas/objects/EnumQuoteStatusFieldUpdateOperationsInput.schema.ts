import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  set: QuoteStatusSchema.optional()
}).strict();
export const EnumQuoteStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumQuoteStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumQuoteStatusFieldUpdateOperationsInput>;
export const EnumQuoteStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
