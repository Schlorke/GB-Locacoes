import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rentalsCreateManyUsersInputObjectSchema } from './rentalsCreateManyUsersInput.schema'

export const rentalsCreateManyUsersInputEnvelopeObjectSchema: z.ZodType<
  Prisma.rentalsCreateManyUsersInputEnvelope,
  Prisma.rentalsCreateManyUsersInputEnvelope
> = z
  .object({
    data: z.union([
      z.lazy(() => rentalsCreateManyUsersInputObjectSchema),
      z.lazy(() => rentalsCreateManyUsersInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
export const rentalsCreateManyUsersInputEnvelopeObjectZodSchema = z
  .object({
    data: z.union([
      z.lazy(() => rentalsCreateManyUsersInputObjectSchema),
      z.lazy(() => rentalsCreateManyUsersInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
