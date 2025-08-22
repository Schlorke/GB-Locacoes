import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

export const UserNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter, Prisma.UserNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputObjectSchema).nullish(),
  isNot: z.lazy(() => UserWhereInputObjectSchema).nullish()
}).strict();
export const UserNullableScalarRelationFilterObjectZodSchema = z.object({
  is: z.lazy(() => UserWhereInputObjectSchema).nullish(),
  isNot: z.lazy(() => UserWhereInputObjectSchema).nullish()
}).strict();
