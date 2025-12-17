import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ContractSelectObjectSchema as ContractSelectObjectSchema } from './objects/ContractSelect.schema';
import { ContractIncludeObjectSchema as ContractIncludeObjectSchema } from './objects/ContractInclude.schema';
import { ContractWhereUniqueInputObjectSchema as ContractWhereUniqueInputObjectSchema } from './objects/ContractWhereUniqueInput.schema';

export const ContractDeleteOneSchema: z.ZodType<Prisma.ContractDeleteArgs> = z.object({ select: ContractSelectObjectSchema.optional(), include: ContractIncludeObjectSchema.optional(), where: ContractWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ContractDeleteArgs>;

export const ContractDeleteOneZodSchema = z.object({ select: ContractSelectObjectSchema.optional(), include: ContractIncludeObjectSchema.optional(), where: ContractWhereUniqueInputObjectSchema }).strict();