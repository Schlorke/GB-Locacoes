/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountRejectedQuotesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountRejectedQuotesArgsObjectZodSchema = makeSchema();
