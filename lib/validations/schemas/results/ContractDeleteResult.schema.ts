/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const ContractDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  rentalId: z.string(),
  template: z.string().optional(),
  content: z.string().optional(),
  pdfUrl: z.string().optional(),
  signedAt: z.date().optional(),
  signedBy: z.string().optional(),
  zapSignId: z.string().optional(),
  status: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  rental: z.unknown()
}));