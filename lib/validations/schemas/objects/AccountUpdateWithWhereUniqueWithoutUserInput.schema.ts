import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { AccountWhereUniqueInputObjectSchema } from './AccountWhereUniqueInput.schema'
import { AccountUpdateWithoutUserInputObjectSchema } from './AccountUpdateWithoutUserInput.schema'
import { AccountUncheckedUpdateWithoutUserInputObjectSchema } from './AccountUncheckedUpdateWithoutUserInput.schema'

export const AccountUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<
  Prisma.AccountUpdateWithWhereUniqueWithoutUserInput,
  Prisma.AccountUpdateWithWhereUniqueWithoutUserInput
> = z
  .object({
    where: z.lazy(() => AccountWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => AccountUpdateWithoutUserInputObjectSchema),
      z.lazy(() => AccountUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
  })
  .strict()
export const AccountUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = z
  .object({
    where: z.lazy(() => AccountWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => AccountUpdateWithoutUserInputObjectSchema),
      z.lazy(() => AccountUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
  })
  .strict()
