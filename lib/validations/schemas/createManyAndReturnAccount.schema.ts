import { z } from 'zod';
import { AccountSelectObjectSchema } from './objects/AccountSelect.schema';
import { AccountIncludeObjectSchema } from './objects/AccountInclude.schema';
import { AccountCreateManyInputObjectSchema } from './objects/AccountCreateManyInput.schema'

export const AccountCreateManyAndReturnSchema = z.object({ select: AccountSelectObjectSchema.optional(), include: AccountIncludeObjectSchema.optional(), data: z.union([ AccountCreateManyInputObjectSchema, z.array(AccountCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })