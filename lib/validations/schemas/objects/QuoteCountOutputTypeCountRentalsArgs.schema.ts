/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsWhereInputObjectSchema).optional()
}).strict();
export const QuoteCountOutputTypeCountRentalsArgsObjectSchema = makeSchema();
export const QuoteCountOutputTypeCountRentalsArgsObjectZodSchema = makeSchema();
