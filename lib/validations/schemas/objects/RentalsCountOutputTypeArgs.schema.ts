/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RentalsCountOutputTypeSelectObjectSchema as RentalsCountOutputTypeSelectObjectSchema } from './RentalsCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => RentalsCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const RentalsCountOutputTypeArgsObjectSchema = makeSchema();
export const RentalsCountOutputTypeArgsObjectZodSchema = makeSchema();
