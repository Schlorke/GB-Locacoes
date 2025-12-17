/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ContractCreateManyInputObjectSchema as ContractCreateManyInputObjectSchema } from './objects/ContractCreateManyInput.schema';

export const ContractCreateManySchema: z.ZodType<Prisma.ContractCreateManyArgs> = z.object({ data: z.union([ ContractCreateManyInputObjectSchema, z.array(ContractCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ContractCreateManyArgs>;

export const ContractCreateManyZodSchema = z.object({ data: z.union([ ContractCreateManyInputObjectSchema, z.array(ContractCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();