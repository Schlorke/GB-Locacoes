/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'

const makeSchema = () => z.object({
  set: QuoteStatusSchema.optional()
}).strict();
export const EnumQuoteStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumQuoteStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumQuoteStatusFieldUpdateOperationsInput>;
export const EnumQuoteStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
