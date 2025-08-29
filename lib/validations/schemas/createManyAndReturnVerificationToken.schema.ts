import { z } from 'zod';
import { VerificationTokenSelectObjectSchema } from './objects/VerificationTokenSelect.schema';
import { VerificationTokenCreateManyInputObjectSchema } from './objects/VerificationTokenCreateManyInput.schema';

export const VerificationTokenCreateManyAndReturnSchema = z.object({ select: VerificationTokenSelectObjectSchema.optional(), data: z.union([ VerificationTokenCreateManyInputObjectSchema, z.array(VerificationTokenCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()