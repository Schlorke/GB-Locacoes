import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ContractWhereInputObjectSchema as ContractWhereInputObjectSchema } from './objects/ContractWhereInput.schema';

export const ContractDeleteManySchema: z.ZodType<Prisma.ContractDeleteManyArgs> = z.object({ where: ContractWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ContractDeleteManyArgs>;

export const ContractDeleteManyZodSchema = z.object({ where: ContractWhereInputObjectSchema.optional() }).strict();