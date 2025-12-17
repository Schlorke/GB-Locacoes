import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ContractStatusSchema } from '../enums/ContractStatus.schema';
import { rentalsCreateNestedOneWithoutContractInputObjectSchema as rentalsCreateNestedOneWithoutContractInputObjectSchema } from './rentalsCreateNestedOneWithoutContractInput.schema'

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
  rental: z.lazy(() => rentalsCreateNestedOneWithoutContractInputObjectSchema)
}).strict();
export const ContractCreateInputObjectSchema: z.ZodType<Prisma.ContractCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ContractCreateInput>;
export const ContractCreateInputObjectZodSchema = makeSchema();
