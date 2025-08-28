import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  providerAccountId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  refresh_token: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  access_token: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  expires_at: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).nullish(),
  token_type: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  scope: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  id_token: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  session_state: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish()
}).strict();
export const AccountScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput>;
export const AccountScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
