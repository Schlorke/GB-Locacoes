/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteCountOutputTypeCountPaymentsArgsObjectSchema as QuoteCountOutputTypeCountPaymentsArgsObjectSchema } from './QuoteCountOutputTypeCountPaymentsArgs.schema';
import { QuoteCountOutputTypeCountItemsArgsObjectSchema as QuoteCountOutputTypeCountItemsArgsObjectSchema } from './QuoteCountOutputTypeCountItemsArgs.schema';
import { QuoteCountOutputTypeCountRentalsArgsObjectSchema as QuoteCountOutputTypeCountRentalsArgsObjectSchema } from './QuoteCountOutputTypeCountRentalsArgs.schema'

const makeSchema = () => z.object({
  payments: z.union([z.boolean(), z.lazy(() => QuoteCountOutputTypeCountPaymentsArgsObjectSchema)]).optional(),
  items: z.union([z.boolean(), z.lazy(() => QuoteCountOutputTypeCountItemsArgsObjectSchema)]).optional(),
  rentals: z.union([z.boolean(), z.lazy(() => QuoteCountOutputTypeCountRentalsArgsObjectSchema)]).optional()
}).strict();
export const QuoteCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.QuoteCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCountOutputTypeSelect>;
export const QuoteCountOutputTypeSelectObjectZodSchema = makeSchema();
