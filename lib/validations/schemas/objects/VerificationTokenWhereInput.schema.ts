import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

export const VerificationTokenWhereInputObjectSchema: z.ZodType<Prisma.VerificationTokenWhereInput, Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([z.lazy(() => VerificationTokenWhereInputObjectSchema), z.lazy(() => VerificationTokenWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => VerificationTokenWhereInputObjectSchema), z.lazy(() => VerificationTokenWhereInputObjectSchema).array()]).optional(),
  identifier: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional()
}).strict();
export const VerificationTokenWhereInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => VerificationTokenWhereInputObjectSchema), z.lazy(() => VerificationTokenWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => VerificationTokenWhereInputObjectSchema), z.lazy(() => VerificationTokenWhereInputObjectSchema).array()]).optional(),
  identifier: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional()
}).strict();
