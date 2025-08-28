import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenSelectObjectSchema } from './VerificationTokenSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => VerificationTokenSelectObjectSchema).optional()
}).strict();
export const VerificationTokenArgsObjectSchema = makeSchema();
export const VerificationTokenArgsObjectZodSchema = makeSchema();
