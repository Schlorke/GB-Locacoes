import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenIdentifierTokenCompoundUniqueInputObjectSchema } from './VerificationTokenIdentifierTokenCompoundUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  token: z.string(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputObjectSchema)
}).strict();
export const VerificationTokenWhereUniqueInputObjectSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenWhereUniqueInput>;
export const VerificationTokenWhereUniqueInputObjectZodSchema = makeSchema();
