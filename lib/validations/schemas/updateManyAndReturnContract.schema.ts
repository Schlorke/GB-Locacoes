import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ContractSelectObjectSchema as ContractSelectObjectSchema } from './objects/ContractSelect.schema';
import { ContractUpdateManyMutationInputObjectSchema as ContractUpdateManyMutationInputObjectSchema } from './objects/ContractUpdateManyMutationInput.schema';
import { ContractWhereInputObjectSchema as ContractWhereInputObjectSchema } from './objects/ContractWhereInput.schema';

export const ContractUpdateManyAndReturnSchema: z.ZodType<Prisma.ContractUpdateManyAndReturnArgs> = z.object({ select: ContractSelectObjectSchema.optional(), data: ContractUpdateManyMutationInputObjectSchema, where: ContractWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ContractUpdateManyAndReturnArgs>;

export const ContractUpdateManyAndReturnZodSchema = z.object({ select: ContractSelectObjectSchema.optional(), data: ContractUpdateManyMutationInputObjectSchema, where: ContractWhereInputObjectSchema.optional() }).strict();