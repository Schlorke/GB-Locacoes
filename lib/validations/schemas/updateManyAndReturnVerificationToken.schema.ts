import { z } from 'zod';
import { VerificationTokenSelectObjectSchema } from './objects/VerificationTokenSelect.schema';
import { VerificationTokenUpdateManyMutationInputObjectSchema } from './objects/VerificationTokenUpdateManyMutationInput.schema';
import { VerificationTokenWhereInputObjectSchema } from './objects/VerificationTokenWhereInput.schema';

export const VerificationTokenUpdateManyAndReturnSchema = z.object({ select: VerificationTokenSelectObjectSchema.optional(), data: VerificationTokenUpdateManyMutationInputObjectSchema, where: VerificationTokenWhereInputObjectSchema.optional()  }).strict()