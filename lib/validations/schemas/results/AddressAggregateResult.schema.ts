import * as z from 'zod';
export const AddressAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    street: z.number(),
    number: z.number(),
    complement: z.number(),
    neighborhood: z.number(),
    city: z.number(),
    state: z.number(),
    zipCode: z.number(),
    isPrimary: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    street: z.string().nullable(),
    number: z.string().nullable(),
    complement: z.string().nullable(),
    neighborhood: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zipCode: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    street: z.string().nullable(),
    number: z.string().nullable(),
    complement: z.string().nullable(),
    neighborhood: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zipCode: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});