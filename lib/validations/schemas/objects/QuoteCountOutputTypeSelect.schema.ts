/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  items: z.boolean().optional()
}).strict();
export const QuoteCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.QuoteCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCountOutputTypeSelect>;
export const QuoteCountOutputTypeSelectObjectZodSchema = makeSchema();
