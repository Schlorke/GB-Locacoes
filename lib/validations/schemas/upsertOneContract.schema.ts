import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ContractSelectObjectSchema as ContractSelectObjectSchema } from './objects/ContractSelect.schema';
import { ContractIncludeObjectSchema as ContractIncludeObjectSchema } from './objects/ContractInclude.schema';
import { ContractWhereUniqueInputObjectSchema as ContractWhereUniqueInputObjectSchema } from './objects/ContractWhereUniqueInput.schema';
import { ContractCreateInputObjectSchema as ContractCreateInputObjectSchema } from './objects/ContractCreateInput.schema';
import { ContractUncheckedCreateInputObjectSchema as ContractUncheckedCreateInputObjectSchema } from './objects/ContractUncheckedCreateInput.schema';
import { ContractUpdateInputObjectSchema as ContractUpdateInputObjectSchema } from './objects/ContractUpdateInput.schema';
import { ContractUncheckedUpdateInputObjectSchema as ContractUncheckedUpdateInputObjectSchema } from './objects/ContractUncheckedUpdateInput.schema';

export const ContractUpsertOneSchema: z.ZodType<Prisma.ContractUpsertArgs> = z.object({ select: ContractSelectObjectSchema.optional(), include: ContractIncludeObjectSchema.optional(), where: ContractWhereUniqueInputObjectSchema, create: z.union([ ContractCreateInputObjectSchema, ContractUncheckedCreateInputObjectSchema ]), update: z.union([ ContractUpdateInputObjectSchema, ContractUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ContractUpsertArgs>;

export const ContractUpsertOneZodSchema = z.object({ select: ContractSelectObjectSchema.optional(), include: ContractIncludeObjectSchema.optional(), where: ContractWhereUniqueInputObjectSchema, create: z.union([ ContractCreateInputObjectSchema, ContractUncheckedCreateInputObjectSchema ]), update: z.union([ ContractUpdateInputObjectSchema, ContractUncheckedUpdateInputObjectSchema ]) }).strict();