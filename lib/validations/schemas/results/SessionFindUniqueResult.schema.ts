/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
export const SessionFindUniqueResultSchema = z.nullable(
  z.object({
    id: z.string(),
    sessionToken: z.string(),
    userId: z.string(),
    expires: z.date(),
    user: z.unknown(),
  })
)
