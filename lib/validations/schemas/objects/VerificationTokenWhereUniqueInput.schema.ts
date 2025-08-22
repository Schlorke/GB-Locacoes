import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { VerificationTokenIdentifierTokenCompoundUniqueInputObjectSchema } from './VerificationTokenIdentifierTokenCompoundUniqueInput.schema'

export const VerificationTokenWhereUniqueInputObjectSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput, Prisma.VerificationTokenWhereUniqueInput> = z.object({
  token: z.string(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputObjectSchema)
}).strict();
export const VerificationTokenWhereUniqueInputObjectZodSchema = z.object({
  token: z.string(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputObjectSchema)
}).strict();
