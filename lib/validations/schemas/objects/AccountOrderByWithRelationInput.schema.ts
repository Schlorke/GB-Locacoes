import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  providerAccountId: SortOrderSchema.optional(),
  refresh_token: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  access_token: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expires_at: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  token_type: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  scope: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  id_token: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  session_state: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const AccountOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountOrderByWithRelationInput>;
export const AccountOrderByWithRelationInputObjectZodSchema = makeSchema();
