/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const ContractGroupByResultSchema = z.array(z.object({
  id: z.string(),
  rentalId: z.string(),
  template: z.string(),
  content: z.string(),
  pdfUrl: z.string(),
  signedAt: z.date(),
  signedBy: z.string(),
  zapSignId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    rentalId: z.number(),
    template: z.number(),
    content: z.number(),
    pdfUrl: z.number(),
    signedAt: z.number(),
    signedBy: z.number(),
    zapSignId: z.number(),
    status: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    rental: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    rentalId: z.string().nullable(),
    template: z.string().nullable(),
    content: z.string().nullable(),
    pdfUrl: z.string().nullable(),
    signedAt: z.date().nullable(),
    signedBy: z.string().nullable(),
    zapSignId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    rentalId: z.string().nullable(),
    template: z.string().nullable(),
    content: z.string().nullable(),
    pdfUrl: z.string().nullable(),
    signedAt: z.date().nullable(),
    signedBy: z.string().nullable(),
    zapSignId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));