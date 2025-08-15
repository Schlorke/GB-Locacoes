import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SessionCreateManyUserInputObjectSchema } from './SessionCreateManyUserInput.schema'

export const SessionCreateManyUserInputEnvelopeObjectSchema: z.ZodType<
  Prisma.SessionCreateManyUserInputEnvelope,
  Prisma.SessionCreateManyUserInputEnvelope
> = z
  .object({
    data: z.union([
      z.lazy(() => SessionCreateManyUserInputObjectSchema),
      z.lazy(() => SessionCreateManyUserInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
export const SessionCreateManyUserInputEnvelopeObjectZodSchema = z
  .object({
    data: z.union([
      z.lazy(() => SessionCreateManyUserInputObjectSchema),
      z.lazy(() => SessionCreateManyUserInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
