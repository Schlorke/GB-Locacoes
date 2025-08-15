import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { AccountProviderProviderAccountIdCompoundUniqueInputObjectSchema } from './AccountProviderProviderAccountIdCompoundUniqueInput.schema'

export const AccountWhereUniqueInputObjectSchema: z.ZodType<
  Prisma.AccountWhereUniqueInput,
  Prisma.AccountWhereUniqueInput
> = z
  .object({
    id: z.string(),
    provider_providerAccountId: z.lazy(
      () => AccountProviderProviderAccountIdCompoundUniqueInputObjectSchema
    ),
  })
  .strict()
export const AccountWhereUniqueInputObjectZodSchema = z
  .object({
    id: z.string(),
    provider_providerAccountId: z.lazy(
      () => AccountProviderProviderAccountIdCompoundUniqueInputObjectSchema
    ),
  })
  .strict()
