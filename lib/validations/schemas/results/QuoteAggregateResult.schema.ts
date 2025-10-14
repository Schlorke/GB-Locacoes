/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
export const QuoteAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      name: z.number(),
      email: z.number(),
      phone: z.number(),
      company: z.number(),
      message: z.number(),
      total: z.number(),
      status: z.number(),
      userId: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
      items: z.number(),
      user: z.number(),
    })
    .optional(),
  _sum: z
    .object({
      total: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _avg: z
    .object({
      total: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      name: z.string().nullable(),
      email: z.string().nullable(),
      phone: z.string().nullable(),
      company: z.string().nullable(),
      message: z.string().nullable(),
      total: z.number().nullable(),
      userId: z.string().nullable(),
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
      phone: z.string().nullable(),
      company: z.string().nullable(),
      message: z.string().nullable(),
      total: z.number().nullable(),
      userId: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
})
