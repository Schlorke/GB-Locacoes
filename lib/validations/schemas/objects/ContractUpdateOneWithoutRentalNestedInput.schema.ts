import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ContractCreateWithoutRentalInputObjectSchema as ContractCreateWithoutRentalInputObjectSchema } from './ContractCreateWithoutRentalInput.schema';
import { ContractUncheckedCreateWithoutRentalInputObjectSchema as ContractUncheckedCreateWithoutRentalInputObjectSchema } from './ContractUncheckedCreateWithoutRentalInput.schema';
import { ContractCreateOrConnectWithoutRentalInputObjectSchema as ContractCreateOrConnectWithoutRentalInputObjectSchema } from './ContractCreateOrConnectWithoutRentalInput.schema';
import { ContractUpsertWithoutRentalInputObjectSchema as ContractUpsertWithoutRentalInputObjectSchema } from './ContractUpsertWithoutRentalInput.schema';
import { ContractWhereInputObjectSchema as ContractWhereInputObjectSchema } from './ContractWhereInput.schema';
import { ContractWhereUniqueInputObjectSchema as ContractWhereUniqueInputObjectSchema } from './ContractWhereUniqueInput.schema';
import { ContractUpdateToOneWithWhereWithoutRentalInputObjectSchema as ContractUpdateToOneWithWhereWithoutRentalInputObjectSchema } from './ContractUpdateToOneWithWhereWithoutRentalInput.schema';
import { ContractUpdateWithoutRentalInputObjectSchema as ContractUpdateWithoutRentalInputObjectSchema } from './ContractUpdateWithoutRentalInput.schema';
import { ContractUncheckedUpdateWithoutRentalInputObjectSchema as ContractUncheckedUpdateWithoutRentalInputObjectSchema } from './ContractUncheckedUpdateWithoutRentalInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ContractCreateWithoutRentalInputObjectSchema), z.lazy(() => ContractUncheckedCreateWithoutRentalInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ContractCreateOrConnectWithoutRentalInputObjectSchema).optional(),
  upsert: z.lazy(() => ContractUpsertWithoutRentalInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ContractWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ContractWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ContractWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ContractUpdateToOneWithWhereWithoutRentalInputObjectSchema), z.lazy(() => ContractUpdateWithoutRentalInputObjectSchema), z.lazy(() => ContractUncheckedUpdateWithoutRentalInputObjectSchema)]).optional()
}).strict();
export const ContractUpdateOneWithoutRentalNestedInputObjectSchema: z.ZodType<Prisma.ContractUpdateOneWithoutRentalNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ContractUpdateOneWithoutRentalNestedInput>;
export const ContractUpdateOneWithoutRentalNestedInputObjectZodSchema = makeSchema();
