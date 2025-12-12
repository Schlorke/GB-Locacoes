/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsCreateWithoutContractInputObjectSchema as rentalsCreateWithoutContractInputObjectSchema } from './rentalsCreateWithoutContractInput.schema';
import { rentalsUncheckedCreateWithoutContractInputObjectSchema as rentalsUncheckedCreateWithoutContractInputObjectSchema } from './rentalsUncheckedCreateWithoutContractInput.schema';
import { rentalsCreateOrConnectWithoutContractInputObjectSchema as rentalsCreateOrConnectWithoutContractInputObjectSchema } from './rentalsCreateOrConnectWithoutContractInput.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutContractInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutContractInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => rentalsCreateOrConnectWithoutContractInputObjectSchema).optional(),
  connect: z.lazy(() => rentalsWhereUniqueInputObjectSchema).optional()
}).strict();
export const rentalsCreateNestedOneWithoutContractInputObjectSchema: z.ZodType<Prisma.rentalsCreateNestedOneWithoutContractInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateNestedOneWithoutContractInput>;
export const rentalsCreateNestedOneWithoutContractInputObjectZodSchema = makeSchema();
