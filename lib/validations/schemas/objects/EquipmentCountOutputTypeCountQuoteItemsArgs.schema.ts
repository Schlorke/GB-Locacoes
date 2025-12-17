/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemWhereInputObjectSchema as QuoteItemWhereInputObjectSchema } from './QuoteItemWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteItemWhereInputObjectSchema).optional()
}).strict();
export const EquipmentCountOutputTypeCountQuoteItemsArgsObjectSchema = makeSchema();
export const EquipmentCountOutputTypeCountQuoteItemsArgsObjectZodSchema = makeSchema();
