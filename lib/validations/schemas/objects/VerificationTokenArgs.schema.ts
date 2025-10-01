/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenSelectObjectSchema as VerificationTokenSelectObjectSchema } from './VerificationTokenSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => VerificationTokenSelectObjectSchema).optional()
}).strict();
export const VerificationTokenArgsObjectSchema = makeSchema();
export const VerificationTokenArgsObjectZodSchema = makeSchema();
