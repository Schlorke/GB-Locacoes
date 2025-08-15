import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const AccountProviderProviderAccountIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput, Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();
export const AccountProviderProviderAccountIdCompoundUniqueInputObjectZodSchema = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();
