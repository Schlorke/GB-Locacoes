/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const CategoryGroupByResultSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  iconColor: z.string(),
  bgColor: z.string(),
  fontColor: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    name: z.number(),
    description: z.number(),
    icon: z.number(),
    iconColor: z.number(),
    bgColor: z.number(),
    fontColor: z.number(),
    slug: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    equipments: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    description: z.string().nullable(),
    icon: z.string().nullable(),
    iconColor: z.string().nullable(),
    bgColor: z.string().nullable(),
    fontColor: z.string().nullable(),
    slug: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    description: z.string().nullable(),
    icon: z.string().nullable(),
    iconColor: z.string().nullable(),
    bgColor: z.string().nullable(),
    fontColor: z.string().nullable(),
    slug: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));