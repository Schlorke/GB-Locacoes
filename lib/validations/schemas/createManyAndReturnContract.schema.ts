import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ContractSelectObjectSchema as ContractSelectObjectSchema } from './objects/ContractSelect.schema';
import { ContractCreateManyInputObjectSchema as ContractCreateManyInputObjectSchema } from './objects/ContractCreateManyInput.schema';

export const ContractCreateManyAndReturnSchema: z.ZodType<Prisma.ContractCreateManyAndReturnArgs> = z.object({ select: ContractSelectObjectSchema.optional(), data: z.union([ ContractCreateManyInputObjectSchema, z.array(ContractCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ContractCreateManyAndReturnArgs>;

export const ContractCreateManyAndReturnZodSchema = z.object({ select: ContractSelectObjectSchema.optional(), data: z.union([ ContractCreateManyInputObjectSchema, z.array(ContractCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();