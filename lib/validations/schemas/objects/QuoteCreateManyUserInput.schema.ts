import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  company: z.string().nullish(),
  message: z.string().nullish(),
  total: z.number().optional(),
  status: QuoteStatusSchema.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const QuoteCreateManyUserInputObjectSchema: z.ZodType<Prisma.QuoteCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateManyUserInput>;
export const QuoteCreateManyUserInputObjectZodSchema = makeSchema();
