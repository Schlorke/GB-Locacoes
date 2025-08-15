import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const QuoteWhereUniqueInputObjectSchema: z.ZodType<Prisma.QuoteWhereUniqueInput, Prisma.QuoteWhereUniqueInput> = z.object({
  id: z.string()
}).strict();
export const QuoteWhereUniqueInputObjectZodSchema = z.object({
  id: z.string()
}).strict();
