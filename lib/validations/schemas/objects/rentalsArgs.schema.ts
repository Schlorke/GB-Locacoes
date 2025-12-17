/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsSelectObjectSchema as rentalsSelectObjectSchema } from './rentalsSelect.schema';
import { rentalsIncludeObjectSchema as rentalsIncludeObjectSchema } from './rentalsInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => rentalsSelectObjectSchema).optional(),
  include: z.lazy(() => rentalsIncludeObjectSchema).optional()
}).strict();
export const rentalsArgsObjectSchema = makeSchema();
export const rentalsArgsObjectZodSchema = makeSchema();
