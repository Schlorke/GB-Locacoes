import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const verificationtokenwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => VerificationTokenWhereInputObjectSchema),
        z.lazy(() => VerificationTokenWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VerificationTokenWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VerificationTokenWhereInputObjectSchema),
        z.lazy(() => VerificationTokenWhereInputObjectSchema).array(),
      ])
      .optional(),
    identifier: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    token: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    expires: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict()
export const VerificationTokenWhereInputObjectSchema: z.ZodType<Prisma.VerificationTokenWhereInput> =
  verificationtokenwhereinputSchema as unknown as z.ZodType<Prisma.VerificationTokenWhereInput>
export const VerificationTokenWhereInputObjectZodSchema =
  verificationtokenwhereinputSchema
