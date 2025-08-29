import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string()
}).strict();
export const QuoteWhereUniqueInputObjectSchema: z.ZodType<Prisma.QuoteWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteWhereUniqueInput>;
export const QuoteWhereUniqueInputObjectZodSchema = makeSchema();
