/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ContractCreateWithoutRentalInputObjectSchema as ContractCreateWithoutRentalInputObjectSchema } from './ContractCreateWithoutRentalInput.schema';
import { ContractUncheckedCreateWithoutRentalInputObjectSchema as ContractUncheckedCreateWithoutRentalInputObjectSchema } from './ContractUncheckedCreateWithoutRentalInput.schema';
import { ContractCreateOrConnectWithoutRentalInputObjectSchema as ContractCreateOrConnectWithoutRentalInputObjectSchema } from './ContractCreateOrConnectWithoutRentalInput.schema';
import { ContractWhereUniqueInputObjectSchema as ContractWhereUniqueInputObjectSchema } from './ContractWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ContractCreateWithoutRentalInputObjectSchema), z.lazy(() => ContractUncheckedCreateWithoutRentalInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ContractCreateOrConnectWithoutRentalInputObjectSchema).optional(),
  connect: z.lazy(() => ContractWhereUniqueInputObjectSchema).optional()
}).strict();
export const ContractUncheckedCreateNestedOneWithoutRentalInputObjectSchema: z.ZodType<Prisma.ContractUncheckedCreateNestedOneWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.ContractUncheckedCreateNestedOneWithoutRentalInput>;
export const ContractUncheckedCreateNestedOneWithoutRentalInputObjectZodSchema = makeSchema();
