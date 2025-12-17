/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ContractWhereUniqueInputObjectSchema as ContractWhereUniqueInputObjectSchema } from './ContractWhereUniqueInput.schema';
import { ContractCreateWithoutRentalInputObjectSchema as ContractCreateWithoutRentalInputObjectSchema } from './ContractCreateWithoutRentalInput.schema';
import { ContractUncheckedCreateWithoutRentalInputObjectSchema as ContractUncheckedCreateWithoutRentalInputObjectSchema } from './ContractUncheckedCreateWithoutRentalInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ContractWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ContractCreateWithoutRentalInputObjectSchema), z.lazy(() => ContractUncheckedCreateWithoutRentalInputObjectSchema)])
}).strict();
export const ContractCreateOrConnectWithoutRentalInputObjectSchema: z.ZodType<Prisma.ContractCreateOrConnectWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.ContractCreateOrConnectWithoutRentalInput>;
export const ContractCreateOrConnectWithoutRentalInputObjectZodSchema = makeSchema();
