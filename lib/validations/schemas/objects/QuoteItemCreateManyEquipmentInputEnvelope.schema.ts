/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentQuoteItemCreateManyEquipmentInputObjectSchema as QuoteItemCreateManyEquipmentInputObjectSchema } from './QuoteItemCreateManyEquipmentInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => QuoteItemCreateManyEquipmentInputObjectSchema), z.lazy(() => QuoteItemCreateManyEquipmentInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const QuoteItemCreateManyEquipmentInputEnvelopeObjectSchema: z.ZodType<Prisma.QuoteItemCreateManyEquipmentInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateManyEquipmentInputEnvelope>;
export const QuoteItemCreateManyEquipmentInputEnvelopeObjectZodSchema = makeSchema();
