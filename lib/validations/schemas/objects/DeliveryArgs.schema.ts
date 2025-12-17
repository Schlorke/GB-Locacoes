/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliverySelectObjectSchema as DeliverySelectObjectSchema } from './DeliverySelect.schema';
import { DeliveryIncludeObjectSchema as DeliveryIncludeObjectSchema } from './DeliveryInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => DeliverySelectObjectSchema).optional(),
  include: z.lazy(() => DeliveryIncludeObjectSchema).optional()
}).strict();
export const DeliveryArgsObjectSchema = makeSchema();
export const DeliveryArgsObjectZodSchema = makeSchema();
