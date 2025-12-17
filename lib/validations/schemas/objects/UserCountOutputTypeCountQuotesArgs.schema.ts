import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountQuotesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountQuotesArgsObjectZodSchema = makeSchema();
