/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DriverSelectObjectSchema as DriverSelectObjectSchema } from './DriverSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => DriverSelectObjectSchema).optional()
}).strict();
export const DriverArgsObjectSchema = makeSchema();
export const DriverArgsObjectZodSchema = makeSchema();
