import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

export const UserScalarRelationFilterObjectSchema: z.ZodType<Prisma.UserScalarRelationFilter, Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserScalarRelationFilterObjectZodSchema = z.object({
  is: z.lazy(() => UserWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
