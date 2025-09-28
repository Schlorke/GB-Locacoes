/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { UserCreateNestedOneWithoutQuotesInputObjectSchema as UserCreateNestedOneWithoutQuotesInputObjectSchema } from './UserCreateNestedOneWithoutQuotesInput.schema'

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
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputObjectSchema).optional()
}).strict();
export const QuoteCreateWithoutItemsInputObjectSchema: z.ZodType<Prisma.QuoteCreateWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateWithoutItemsInput>;
export const QuoteCreateWithoutItemsInputObjectZodSchema = makeSchema();
