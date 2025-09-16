import { z } from 'zod';
export const QuoteItemGroupByResultSchema = z.array(z.object({
  id: z.string(),
  quoteId: z.string(),
  equipmentId: z.string(),
  quantity: z.number().int(),
  days: z.number().int(),
  pricePerDay: z.number(),
  total: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    quoteId: z.number(),
    equipmentId: z.number(),
    quantity: z.number(),
    days: z.number(),
    pricePerDay: z.number(),
    total: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    equipment: z.number(),
    quote: z.number()
  }).optional(),
  _sum: z.object({
    quantity: z.number().nullable(),
    days: z.number().nullable(),
    pricePerDay: z.number().nullable(),
    total: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    quantity: z.number().nullable(),
    days: z.number().nullable(),
    pricePerDay: z.number().nullable(),
    total: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    quoteId: z.string().nullable(),
    equipmentId: z.string().nullable(),
    quantity: z.number().int().nullable(),
    days: z.number().int().nullable(),
    pricePerDay: z.number().nullable(),
    total: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    quoteId: z.string().nullable(),
    equipmentId: z.string().nullable(),
    quantity: z.number().int().nullable(),
    days: z.number().int().nullable(),
    pricePerDay: z.number().nullable(),
    total: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));