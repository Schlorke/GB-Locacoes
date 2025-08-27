import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SessionWhereInputObjectSchema } from './SessionWhereInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      every: z.lazy(() => SessionWhereInputObjectSchema).optional(),
      some: z.lazy(() => SessionWhereInputObjectSchema).optional(),
      none: z.lazy(() => SessionWhereInputObjectSchema).optional(),
    })
    .strict()
export const SessionListRelationFilterObjectSchema: z.ZodType<Prisma.SessionListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.SessionListRelationFilter>
export const SessionListRelationFilterObjectZodSchema = makeSchema()
