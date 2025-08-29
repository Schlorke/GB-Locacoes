import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  sessionToken: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  expires: SortOrderSchema.optional()
}).strict();
export const SessionCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionCountOrderByAggregateInput>;
export const SessionCountOrderByAggregateInputObjectZodSchema = makeSchema();
