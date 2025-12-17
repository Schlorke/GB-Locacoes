/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ContractStatusSchema } from '../enums/ContractStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  template: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  pdfUrl: z.string().optional().nullable(),
  signedAt: z.coerce.date().optional().nullable(),
  signedBy: z.string().optional().nullable(),
  zapSignId: z.string().optional().nullable(),
  status: ContractStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ContractCreateWithoutRentalInputObjectSchema: z.ZodType<Prisma.ContractCreateWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.ContractCreateWithoutRentalInput>;
export const ContractCreateWithoutRentalInputObjectZodSchema = makeSchema();
