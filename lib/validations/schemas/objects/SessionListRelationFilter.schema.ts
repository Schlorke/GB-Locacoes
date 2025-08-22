import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SessionWhereInputObjectSchema } from './SessionWhereInput.schema'

export const SessionListRelationFilterObjectSchema: z.ZodType<Prisma.SessionListRelationFilter, Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputObjectSchema).optional(),
  some: z.lazy(() => SessionWhereInputObjectSchema).optional(),
  none: z.lazy(() => SessionWhereInputObjectSchema).optional()
}).strict();
export const SessionListRelationFilterObjectZodSchema = z.object({
  every: z.lazy(() => SessionWhereInputObjectSchema).optional(),
  some: z.lazy(() => SessionWhereInputObjectSchema).optional(),
  none: z.lazy(() => SessionWhereInputObjectSchema).optional()
}).strict();
