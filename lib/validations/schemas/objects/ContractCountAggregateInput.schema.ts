/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  rentalId: z.literal(true).optional(),
  template: z.literal(true).optional(),
  content: z.literal(true).optional(),
  pdfUrl: z.literal(true).optional(),
  signedAt: z.literal(true).optional(),
  signedBy: z.literal(true).optional(),
  zapSignId: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ContractCountAggregateInputObjectSchema: z.ZodType<Prisma.ContractCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ContractCountAggregateInputType>;
export const ContractCountAggregateInputObjectZodSchema = makeSchema();
