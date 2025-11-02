/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteCountOutputTypeCountItemsArgsObjectSchema as QuoteCountOutputTypeCountItemsArgsObjectSchema } from './QuoteCountOutputTypeCountItemsArgs.schema'

const makeSchema = () => z.object({
  items: z.union([z.boolean(), z.lazy(() => QuoteCountOutputTypeCountItemsArgsObjectSchema)]).optional()
}).strict();
export const QuoteCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.QuoteCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCountOutputTypeSelect>;
export const QuoteCountOutputTypeSelectObjectZodSchema = makeSchema();
