import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();
export const AccountProviderProviderAccountIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput>;
export const AccountProviderProviderAccountIdCompoundUniqueInputObjectZodSchema = makeSchema();
