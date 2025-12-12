/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ContractSelectObjectSchema as ContractSelectObjectSchema } from './objects/ContractSelect.schema';
import { ContractIncludeObjectSchema as ContractIncludeObjectSchema } from './objects/ContractInclude.schema';
import { ContractCreateInputObjectSchema as ContractCreateInputObjectSchema } from './objects/ContractCreateInput.schema';
import { ContractUncheckedCreateInputObjectSchema as ContractUncheckedCreateInputObjectSchema } from './objects/ContractUncheckedCreateInput.schema';

export const ContractCreateOneSchema: z.ZodType<Prisma.ContractCreateArgs> = z.object({ select: ContractSelectObjectSchema.optional(), include: ContractIncludeObjectSchema.optional(), data: z.union([ContractCreateInputObjectSchema, ContractUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ContractCreateArgs>;

export const ContractCreateOneZodSchema = z.object({ select: ContractSelectObjectSchema.optional(), include: ContractIncludeObjectSchema.optional(), data: z.union([ContractCreateInputObjectSchema, ContractUncheckedCreateInputObjectSchema]) }).strict();