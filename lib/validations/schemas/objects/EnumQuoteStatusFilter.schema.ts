import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { NestedEnumQuoteStatusFilterObjectSchema } from './NestedEnumQuoteStatusFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: QuoteStatusSchema.optional(),
  in: QuoteStatusSchema.array().optional(),
  notIn: QuoteStatusSchema.array().optional(),
  not: z.union([QuoteStatusSchema, z.lazy(() => NestedEnumQuoteStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumQuoteStatusFilterObjectSchema: z.ZodType<Prisma.EnumQuoteStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumQuoteStatusFilter>;
export const EnumQuoteStatusFilterObjectZodSchema = makeSchema();
