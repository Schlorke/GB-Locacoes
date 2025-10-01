/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  company: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  total: z.number().optional(),
  status: QuoteStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const QuoteCreateManyUserInputObjectSchema: z.ZodType<Prisma.QuoteCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateManyUserInput>;
export const QuoteCreateManyUserInputObjectZodSchema = makeSchema();
