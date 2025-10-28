/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenIdentifierTokenCompoundUniqueInputObjectSchema as VerificationTokenIdentifierTokenCompoundUniqueInputObjectSchema } from './VerificationTokenIdentifierTokenCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputObjectSchema).optional()
}).strict();
export const VerificationTokenWhereUniqueInputObjectSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenWhereUniqueInput>;
export const VerificationTokenWhereUniqueInputObjectZodSchema = makeSchema();
