/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ContractSelectObjectSchema as ContractSelectObjectSchema } from './objects/ContractSelect.schema';
import { ContractIncludeObjectSchema as ContractIncludeObjectSchema } from './objects/ContractInclude.schema';
import { ContractUpdateInputObjectSchema as ContractUpdateInputObjectSchema } from './objects/ContractUpdateInput.schema';
import { ContractUncheckedUpdateInputObjectSchema as ContractUncheckedUpdateInputObjectSchema } from './objects/ContractUncheckedUpdateInput.schema';
import { ContractWhereUniqueInputObjectSchema as ContractWhereUniqueInputObjectSchema } from './objects/ContractWhereUniqueInput.schema';

export const ContractUpdateOneSchema: z.ZodType<Prisma.ContractUpdateArgs> = z.object({ select: ContractSelectObjectSchema.optional(), include: ContractIncludeObjectSchema.optional(), data: z.union([ContractUpdateInputObjectSchema, ContractUncheckedUpdateInputObjectSchema]), where: ContractWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ContractUpdateArgs>;

export const ContractUpdateOneZodSchema = z.object({ select: ContractSelectObjectSchema.optional(), include: ContractIncludeObjectSchema.optional(), data: z.union([ContractUpdateInputObjectSchema, ContractUncheckedUpdateInputObjectSchema]), where: ContractWhereUniqueInputObjectSchema }).strict();