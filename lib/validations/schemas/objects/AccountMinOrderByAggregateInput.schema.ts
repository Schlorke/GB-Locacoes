import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  providerAccountId: SortOrderSchema.optional(),
  refresh_token: SortOrderSchema.optional(),
  access_token: SortOrderSchema.optional(),
  expires_at: SortOrderSchema.optional(),
  token_type: SortOrderSchema.optional(),
  scope: SortOrderSchema.optional(),
  id_token: SortOrderSchema.optional(),
  session_state: SortOrderSchema.optional()
}).strict();
export const AccountMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountMinOrderByAggregateInput>;
export const AccountMinOrderByAggregateInputObjectZodSchema = makeSchema();
