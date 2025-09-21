import { z } from 'zod'
export const UserAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      name: z.number(),
      email: z.number(),
      password: z.number(),
      role: z.number(),
      emailVerified: z.number(),
      image: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
      accounts: z.number(),
      quotes: z.number(),
      rentals: z.number(),
      sessions: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      name: z.string().nullable(),
      email: z.string().nullable(),
      password: z.string().nullable(),
      emailVerified: z.date().nullable(),
      image: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      name: z.string().nullable(),
      email: z.string().nullable(),
      password: z.string().nullable(),
      emailVerified: z.date().nullable(),
      image: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
})
