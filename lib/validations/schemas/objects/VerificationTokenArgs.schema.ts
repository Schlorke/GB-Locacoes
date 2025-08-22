import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { VerificationTokenSelectObjectSchema } from './VerificationTokenSelect.schema'

export const VerificationTokenArgsObjectSchema = z.object({
  select: z.lazy(() => VerificationTokenSelectObjectSchema).optional()
}).strict();
export const VerificationTokenArgsObjectZodSchema = z.object({
  select: z.lazy(() => VerificationTokenSelectObjectSchema).optional()
}).strict();
