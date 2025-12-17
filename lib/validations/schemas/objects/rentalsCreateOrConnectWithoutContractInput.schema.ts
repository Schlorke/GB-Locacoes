import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsCreateWithoutContractInputObjectSchema as rentalsCreateWithoutContractInputObjectSchema } from './rentalsCreateWithoutContractInput.schema';
import { rentalsUncheckedCreateWithoutContractInputObjectSchema as rentalsUncheckedCreateWithoutContractInputObjectSchema } from './rentalsUncheckedCreateWithoutContractInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => rentalsCreateWithoutContractInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutContractInputObjectSchema)])
}).strict();
export const rentalsCreateOrConnectWithoutContractInputObjectSchema: z.ZodType<Prisma.rentalsCreateOrConnectWithoutContractInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateOrConnectWithoutContractInput>;
export const rentalsCreateOrConnectWithoutContractInputObjectZodSchema = makeSchema();
