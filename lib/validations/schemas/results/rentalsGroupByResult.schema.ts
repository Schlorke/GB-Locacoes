import { z } from 'zod'
export const rentalsGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    startdate: z.date(),
    enddate: z.date(),
    total: z.number(),
    status: z.string(),
    userid: z.string(),
    createdat: z.date(),
    updatedat: z.date(),
    _count: z
      .object({
        id: z.number(),
        startdate: z.number(),
        enddate: z.number(),
        total: z.number(),
        status: z.number(),
        userid: z.number(),
        createdat: z.number(),
        updatedat: z.number(),
        rental_items: z.number(),
        users: z.number(),
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
        startdate: z.date().nullable(),
        enddate: z.date().nullable(),
        total: z.number().nullable(),
        status: z.string().nullable(),
        userid: z.string().nullable(),
        createdat: z.date().nullable(),
        updatedat: z.date().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        startdate: z.date().nullable(),
        enddate: z.date().nullable(),
        total: z.number().nullable(),
        status: z.string().nullable(),
        userid: z.string().nullable(),
        createdat: z.date().nullable(),
        updatedat: z.date().nullable(),
      })
      .nullable()
      .optional(),
  })
)
