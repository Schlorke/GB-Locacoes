import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  identifier: z.string(),
  token: z.string()
}).strict();
export const VerificationTokenIdentifierTokenCompoundUniqueInputObjectSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput>;
export const VerificationTokenIdentifierTokenCompoundUniqueInputObjectZodSchema = makeSchema();
