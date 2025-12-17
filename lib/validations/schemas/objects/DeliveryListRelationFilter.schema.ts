/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryWhereInputObjectSchema as DeliveryWhereInputObjectSchema } from './DeliveryWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => DeliveryWhereInputObjectSchema).optional(),
  some: z.lazy(() => DeliveryWhereInputObjectSchema).optional(),
  none: z.lazy(() => DeliveryWhereInputObjectSchema).optional()
}).strict();
export const DeliveryListRelationFilterObjectSchema: z.ZodType<Prisma.DeliveryListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryListRelationFilter>;
export const DeliveryListRelationFilterObjectZodSchema = makeSchema();
