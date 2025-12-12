/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsArgsObjectSchema as rentalsArgsObjectSchema } from './rentalsArgs.schema'

const makeSchema = () => z.object({
  rental: z.union([z.boolean(), z.lazy(() => rentalsArgsObjectSchema)]).optional()
}).strict();
export const DeliveryIncludeObjectSchema: z.ZodType<Prisma.DeliveryInclude> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryInclude>;
export const DeliveryIncludeObjectZodSchema = makeSchema();
