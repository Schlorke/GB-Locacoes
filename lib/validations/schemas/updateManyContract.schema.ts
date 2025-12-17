import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ContractUpdateManyMutationInputObjectSchema as ContractUpdateManyMutationInputObjectSchema } from './objects/ContractUpdateManyMutationInput.schema';
import { ContractWhereInputObjectSchema as ContractWhereInputObjectSchema } from './objects/ContractWhereInput.schema';

export const ContractUpdateManySchema: z.ZodType<Prisma.ContractUpdateManyArgs> = z.object({ data: ContractUpdateManyMutationInputObjectSchema, where: ContractWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ContractUpdateManyArgs>;

export const ContractUpdateManyZodSchema = z.object({ data: ContractUpdateManyMutationInputObjectSchema, where: ContractWhereInputObjectSchema.optional() }).strict();