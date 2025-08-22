import { z } from 'zod';
import { AccountSelectObjectSchema } from './objects/AccountSelect.schema';
import { AccountIncludeObjectSchema } from './objects/AccountInclude.schema';
import { AccountUpdateManyMutationInputObjectSchema } from './objects/AccountUpdateManyMutationInput.schema';
import { AccountWhereInputObjectSchema } from './objects/AccountWhereInput.schema'

export const AccountUpdateManyAndReturnSchema = z.object({ select: AccountSelectObjectSchema.optional(), include: AccountIncludeObjectSchema.optional(), data: AccountUpdateManyMutationInputObjectSchema, where: AccountWhereInputObjectSchema.optional()  })