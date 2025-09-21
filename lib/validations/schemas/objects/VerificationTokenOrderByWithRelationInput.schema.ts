import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  identifier: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  expires: SortOrderSchema.optional()
}).strict();
export const VerificationTokenOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput>;
export const VerificationTokenOrderByWithRelationInputObjectZodSchema = makeSchema();
