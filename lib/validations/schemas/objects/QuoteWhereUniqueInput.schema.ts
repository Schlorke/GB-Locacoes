/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const QuoteWhereUniqueInputObjectSchema: z.ZodType<Prisma.QuoteWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteWhereUniqueInput>;
export const QuoteWhereUniqueInputObjectZodSchema = makeSchema();
