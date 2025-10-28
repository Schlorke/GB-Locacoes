/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const QuoteItemWhereUniqueInputObjectSchema: z.ZodType<Prisma.QuoteItemWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemWhereUniqueInput>;
export const QuoteItemWhereUniqueInputObjectZodSchema = makeSchema();
