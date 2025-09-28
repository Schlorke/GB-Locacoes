/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsSelectObjectSchema as rental_itemsSelectObjectSchema } from './rental_itemsSelect.schema';
import { rental_itemsIncludeObjectSchema as rental_itemsIncludeObjectSchema } from './rental_itemsInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => rental_itemsSelectObjectSchema).optional(),
  include: z.lazy(() => rental_itemsIncludeObjectSchema).optional()
}).strict();
export const rental_itemsArgsObjectSchema = makeSchema();
export const rental_itemsArgsObjectZodSchema = makeSchema();
