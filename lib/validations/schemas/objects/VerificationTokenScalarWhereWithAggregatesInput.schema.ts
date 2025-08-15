import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

export const VerificationTokenScalarWhereWithAggregatesInputObjectSchema: z.ZodType<
  Prisma.VerificationTokenScalarWhereWithAggregatesInput,
  Prisma.VerificationTokenScalarWhereWithAggregatesInput
> = z
  .object({
    AND: z
      .union([
        z.lazy(
          () => VerificationTokenScalarWhereWithAggregatesInputObjectSchema
        ),
        z
          .lazy(
            () => VerificationTokenScalarWhereWithAggregatesInputObjectSchema
          )
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VerificationTokenScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(
          () => VerificationTokenScalarWhereWithAggregatesInputObjectSchema
        ),
        z
          .lazy(
            () => VerificationTokenScalarWhereWithAggregatesInputObjectSchema
          )
          .array(),
      ])
      .optional(),
    identifier: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    token: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    expires: z
      .union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()])
      .optional(),
  })
  .strict()
export const VerificationTokenScalarWhereWithAggregatesInputObjectZodSchema = z
  .object({
    AND: z
      .union([
        z.lazy(
          () => VerificationTokenScalarWhereWithAggregatesInputObjectSchema
        ),
        z
          .lazy(
            () => VerificationTokenScalarWhereWithAggregatesInputObjectSchema
          )
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VerificationTokenScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(
          () => VerificationTokenScalarWhereWithAggregatesInputObjectSchema
        ),
        z
          .lazy(
            () => VerificationTokenScalarWhereWithAggregatesInputObjectSchema
          )
          .array(),
      ])
      .optional(),
    identifier: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    token: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    expires: z
      .union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()])
      .optional(),
  })
  .strict()
