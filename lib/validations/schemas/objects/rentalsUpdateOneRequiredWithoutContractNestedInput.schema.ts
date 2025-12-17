/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsCreateWithoutContractInputObjectSchema as rentalsCreateWithoutContractInputObjectSchema } from './rentalsCreateWithoutContractInput.schema';
import { rentalsUncheckedCreateWithoutContractInputObjectSchema as rentalsUncheckedCreateWithoutContractInputObjectSchema } from './rentalsUncheckedCreateWithoutContractInput.schema';
import { rentalsCreateOrConnectWithoutContractInputObjectSchema as rentalsCreateOrConnectWithoutContractInputObjectSchema } from './rentalsCreateOrConnectWithoutContractInput.schema';
import { rentalsUpsertWithoutContractInputObjectSchema as rentalsUpsertWithoutContractInputObjectSchema } from './rentalsUpsertWithoutContractInput.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsUpdateToOneWithWhereWithoutContractInputObjectSchema as rentalsUpdateToOneWithWhereWithoutContractInputObjectSchema } from './rentalsUpdateToOneWithWhereWithoutContractInput.schema';
import { rentalsUpdateWithoutContractInputObjectSchema as rentalsUpdateWithoutContractInputObjectSchema } from './rentalsUpdateWithoutContractInput.schema';
import { rentalsUncheckedUpdateWithoutContractInputObjectSchema as rentalsUncheckedUpdateWithoutContractInputObjectSchema } from './rentalsUncheckedUpdateWithoutContractInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutContractInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutContractInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => rentalsCreateOrConnectWithoutContractInputObjectSchema).optional(),
  upsert: z.lazy(() => rentalsUpsertWithoutContractInputObjectSchema).optional(),
  connect: z.lazy(() => rentalsWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => rentalsUpdateToOneWithWhereWithoutContractInputObjectSchema), z.lazy(() => rentalsUpdateWithoutContractInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutContractInputObjectSchema)]).optional()
}).strict();
export const rentalsUpdateOneRequiredWithoutContractNestedInputObjectSchema: z.ZodType<Prisma.rentalsUpdateOneRequiredWithoutContractNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateOneRequiredWithoutContractNestedInput>;
export const rentalsUpdateOneRequiredWithoutContractNestedInputObjectZodSchema = makeSchema();
