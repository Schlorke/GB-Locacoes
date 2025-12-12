/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ContractSelectObjectSchema as ContractSelectObjectSchema } from './objects/ContractSelect.schema';
import { ContractIncludeObjectSchema as ContractIncludeObjectSchema } from './objects/ContractInclude.schema';
import { ContractWhereUniqueInputObjectSchema as ContractWhereUniqueInputObjectSchema } from './objects/ContractWhereUniqueInput.schema';

export const ContractFindUniqueSchema: z.ZodType<Prisma.ContractFindUniqueArgs> = z.object({ select: ContractSelectObjectSchema.optional(), include: ContractIncludeObjectSchema.optional(), where: ContractWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ContractFindUniqueArgs>;

export const ContractFindUniqueZodSchema = z.object({ select: ContractSelectObjectSchema.optional(), include: ContractIncludeObjectSchema.optional(), where: ContractWhereUniqueInputObjectSchema }).strict();