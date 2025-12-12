/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const PaymentGroupByResultSchema = z.array(z.object({
  id: z.string(),
  rentalId: z.string(),
  quoteId: z.string(),
  amount: z.number(),
  paidAt: z.date(),
  dueDate: z.date(),
  invoiceNumber: z.string(),
  transactionId: z.string(),
  pixCode: z.string(),
  pixQrCode: z.string(),
  metadata: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    rentalId: z.number(),
    quoteId: z.number(),
    rental: z.number(),
    quote: z.number(),
    amount: z.number(),
    method: z.number(),
    status: z.number(),
    type: z.number(),
    paidAt: z.number(),
    dueDate: z.number(),
    invoiceNumber: z.number(),
    transactionId: z.number(),
    pixCode: z.number(),
    pixQrCode: z.number(),
    metadata: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    amount: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    amount: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    rentalId: z.string().nullable(),
    quoteId: z.string().nullable(),
    amount: z.number().nullable(),
    paidAt: z.date().nullable(),
    dueDate: z.date().nullable(),
    invoiceNumber: z.string().nullable(),
    transactionId: z.string().nullable(),
    pixCode: z.string().nullable(),
    pixQrCode: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    rentalId: z.string().nullable(),
    quoteId: z.string().nullable(),
    amount: z.number().nullable(),
    paidAt: z.date().nullable(),
    dueDate: z.date().nullable(),
    invoiceNumber: z.string().nullable(),
    transactionId: z.string().nullable(),
    pixCode: z.string().nullable(),
    pixQrCode: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));