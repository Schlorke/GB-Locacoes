import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SessionScalarWhereInputObjectSchema } from './SessionScalarWhereInput.schema'
import { SessionUpdateManyMutationInputObjectSchema } from './SessionUpdateManyMutationInput.schema'
import { SessionUncheckedUpdateManyWithoutUserInputObjectSchema } from './SessionUncheckedUpdateManyWithoutUserInput.schema'

export const SessionUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<
  Prisma.SessionUpdateManyWithWhereWithoutUserInput,
  Prisma.SessionUpdateManyWithWhereWithoutUserInput
> = z
  .object({
    where: z.lazy(() => SessionScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => SessionUpdateManyMutationInputObjectSchema),
      z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputObjectSchema),
    ]),
  })
  .strict()
export const SessionUpdateManyWithWhereWithoutUserInputObjectZodSchema = z
  .object({
    where: z.lazy(() => SessionScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => SessionUpdateManyMutationInputObjectSchema),
      z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputObjectSchema),
    ]),
  })
  .strict()
