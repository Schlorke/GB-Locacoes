import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  providerAccountId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  refresh_token: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  access_token: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  expires_at: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).nullish(),
  token_type: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  scope: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  id_token: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  session_state: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish()
}).strict();
export const AccountScalarWhereInputObjectSchema: z.ZodType<Prisma.AccountScalarWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountScalarWhereInput>;
export const AccountScalarWhereInputObjectZodSchema = makeSchema();
