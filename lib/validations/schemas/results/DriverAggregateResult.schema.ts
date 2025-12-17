import * as z from 'zod';
export const DriverAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    name: z.number(),
    phone: z.number(),
    cnh: z.number(),
    cnhCategory: z.number(),
    status: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    phone: z.string().nullable(),
    cnh: z.string().nullable(),
    cnhCategory: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    phone: z.string().nullable(),
    cnh: z.string().nullable(),
    cnhCategory: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});