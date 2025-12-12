/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const ContractFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  rentalId: z.string(),
  rental: z.unknown(),
  template: z.string().optional(),
  content: z.string().optional(),
  pdfUrl: z.string().optional(),
  signedAt: z.date().optional(),
  signedBy: z.string().optional(),
  zapSignId: z.string().optional(),
  status: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});