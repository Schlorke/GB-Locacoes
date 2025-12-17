import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ContractUpdateWithoutRentalInputObjectSchema as ContractUpdateWithoutRentalInputObjectSchema } from './ContractUpdateWithoutRentalInput.schema';
import { ContractUncheckedUpdateWithoutRentalInputObjectSchema as ContractUncheckedUpdateWithoutRentalInputObjectSchema } from './ContractUncheckedUpdateWithoutRentalInput.schema';
import { ContractCreateWithoutRentalInputObjectSchema as ContractCreateWithoutRentalInputObjectSchema } from './ContractCreateWithoutRentalInput.schema';
import { ContractUncheckedCreateWithoutRentalInputObjectSchema as ContractUncheckedCreateWithoutRentalInputObjectSchema } from './ContractUncheckedCreateWithoutRentalInput.schema';
import { ContractWhereInputObjectSchema as ContractWhereInputObjectSchema } from './ContractWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ContractUpdateWithoutRentalInputObjectSchema), z.lazy(() => ContractUncheckedUpdateWithoutRentalInputObjectSchema)]),
  create: z.union([z.lazy(() => ContractCreateWithoutRentalInputObjectSchema), z.lazy(() => ContractUncheckedCreateWithoutRentalInputObjectSchema)]),
  where: z.lazy(() => ContractWhereInputObjectSchema).optional()
}).strict();
export const ContractUpsertWithoutRentalInputObjectSchema: z.ZodType<Prisma.ContractUpsertWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.ContractUpsertWithoutRentalInput>;
export const ContractUpsertWithoutRentalInputObjectZodSchema = makeSchema();
