import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SessionWhereUniqueInputObjectSchema } from './SessionWhereUniqueInput.schema'
import { SessionUpdateWithoutUserInputObjectSchema } from './SessionUpdateWithoutUserInput.schema'
import { SessionUncheckedUpdateWithoutUserInputObjectSchema } from './SessionUncheckedUpdateWithoutUserInput.schema'
import { SessionCreateWithoutUserInputObjectSchema } from './SessionCreateWithoutUserInput.schema'
import { SessionUncheckedCreateWithoutUserInputObjectSchema } from './SessionUncheckedCreateWithoutUserInput.schema'

export const SessionUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<
  Prisma.SessionUpsertWithWhereUniqueWithoutUserInput,
  Prisma.SessionUpsertWithWhereUniqueWithoutUserInput
> = z
  .object({
    where: z.lazy(() => SessionWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => SessionUpdateWithoutUserInputObjectSchema),
      z.lazy(() => SessionUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => SessionCreateWithoutUserInputObjectSchema),
      z.lazy(() => SessionUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict()
export const SessionUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = z
  .object({
    where: z.lazy(() => SessionWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => SessionUpdateWithoutUserInputObjectSchema),
      z.lazy(() => SessionUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => SessionCreateWithoutUserInputObjectSchema),
      z.lazy(() => SessionUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict()
