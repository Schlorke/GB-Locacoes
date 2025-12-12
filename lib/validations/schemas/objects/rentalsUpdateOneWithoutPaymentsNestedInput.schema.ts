/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsCreateWithoutPaymentsInputObjectSchema as rentalsCreateWithoutPaymentsInputObjectSchema } from './rentalsCreateWithoutPaymentsInput.schema';
import { rentalsUncheckedCreateWithoutPaymentsInputObjectSchema as rentalsUncheckedCreateWithoutPaymentsInputObjectSchema } from './rentalsUncheckedCreateWithoutPaymentsInput.schema';
import { rentalsCreateOrConnectWithoutPaymentsInputObjectSchema as rentalsCreateOrConnectWithoutPaymentsInputObjectSchema } from './rentalsCreateOrConnectWithoutPaymentsInput.schema';
import { rentalsUpsertWithoutPaymentsInputObjectSchema as rentalsUpsertWithoutPaymentsInputObjectSchema } from './rentalsUpsertWithoutPaymentsInput.schema';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsUpdateToOneWithWhereWithoutPaymentsInputObjectSchema as rentalsUpdateToOneWithWhereWithoutPaymentsInputObjectSchema } from './rentalsUpdateToOneWithWhereWithoutPaymentsInput.schema';
import { rentalsUpdateWithoutPaymentsInputObjectSchema as rentalsUpdateWithoutPaymentsInputObjectSchema } from './rentalsUpdateWithoutPaymentsInput.schema';
import { rentalsUncheckedUpdateWithoutPaymentsInputObjectSchema as rentalsUncheckedUpdateWithoutPaymentsInputObjectSchema } from './rentalsUncheckedUpdateWithoutPaymentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutPaymentsInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutPaymentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => rentalsCreateOrConnectWithoutPaymentsInputObjectSchema).optional(),
  upsert: z.lazy(() => rentalsUpsertWithoutPaymentsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => rentalsWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => rentalsWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => rentalsWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => rentalsUpdateToOneWithWhereWithoutPaymentsInputObjectSchema), z.lazy(() => rentalsUpdateWithoutPaymentsInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutPaymentsInputObjectSchema)]).optional()
}).strict();
export const rentalsUpdateOneWithoutPaymentsNestedInputObjectSchema: z.ZodType<Prisma.rentalsUpdateOneWithoutPaymentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateOneWithoutPaymentsNestedInput>;
export const rentalsUpdateOneWithoutPaymentsNestedInputObjectZodSchema = makeSchema();
