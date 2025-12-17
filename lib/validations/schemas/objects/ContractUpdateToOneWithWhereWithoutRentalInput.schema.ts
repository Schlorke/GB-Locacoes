import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ContractWhereInputObjectSchema as ContractWhereInputObjectSchema } from './ContractWhereInput.schema';
import { ContractUpdateWithoutRentalInputObjectSchema as ContractUpdateWithoutRentalInputObjectSchema } from './ContractUpdateWithoutRentalInput.schema';
import { ContractUncheckedUpdateWithoutRentalInputObjectSchema as ContractUncheckedUpdateWithoutRentalInputObjectSchema } from './ContractUncheckedUpdateWithoutRentalInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ContractWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ContractUpdateWithoutRentalInputObjectSchema), z.lazy(() => ContractUncheckedUpdateWithoutRentalInputObjectSchema)])
}).strict();
export const ContractUpdateToOneWithWhereWithoutRentalInputObjectSchema: z.ZodType<Prisma.ContractUpdateToOneWithWhereWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.ContractUpdateToOneWithWhereWithoutRentalInput>;
export const ContractUpdateToOneWithWhereWithoutRentalInputObjectZodSchema = makeSchema();
