/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsArgsObjectSchema as rentalsArgsObjectSchema } from './rentalsArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  rentalId: z.boolean().optional(),
  rental: z.union([z.boolean(), z.lazy(() => rentalsArgsObjectSchema)]).optional(),
  template: z.boolean().optional(),
  content: z.boolean().optional(),
  pdfUrl: z.boolean().optional(),
  signedAt: z.boolean().optional(),
  signedBy: z.boolean().optional(),
  zapSignId: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const ContractSelectObjectSchema: z.ZodType<Prisma.ContractSelect> = makeSchema() as unknown as z.ZodType<Prisma.ContractSelect>;
export const ContractSelectObjectZodSchema = makeSchema();
