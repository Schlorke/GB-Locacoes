import { z } from 'zod';
import { AccountSelectObjectSchema } from './objects/AccountSelect.schema';
import { AccountUpdateManyMutationInputObjectSchema } from './objects/AccountUpdateManyMutationInput.schema';
import { AccountWhereInputObjectSchema } from './objects/AccountWhereInput.schema';

export const AccountUpdateManyAndReturnSchema = z.object({ select: AccountSelectObjectSchema.optional(), data: AccountUpdateManyMutationInputObjectSchema, where: AccountWhereInputObjectSchema.optional()  }).strict()