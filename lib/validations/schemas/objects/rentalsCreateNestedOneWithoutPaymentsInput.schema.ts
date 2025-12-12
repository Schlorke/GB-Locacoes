/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsCreateWithoutPaymentsInputObjectSchema as rentalsCreateWithoutPaymentsInputObjectSchema } from './rentalsCreateWithoutPaymentsInput.schema';
import { rentalsUncheckedCreateWithoutPaymentsInputObjectSchema as rentalsUncheckedCreateWithoutPaymentsInputObjectSchema } from './rentalsUncheckedCreateWithoutPaymentsInput.schema';
import { rentalsCreateOrConnectWithoutPaymentsInputObjectSchema as rentalsCreateOrConnectWithoutPaymentsInputObjectSchema } from './rentalsCreateOrConnectWithoutPaymentsInput.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutPaymentsInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutPaymentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => rentalsCreateOrConnectWithoutPaymentsInputObjectSchema).optional(),
  connect: z.lazy(() => rentalsWhereUniqueInputObjectSchema).optional()
}).strict();
export const rentalsCreateNestedOneWithoutPaymentsInputObjectSchema: z.ZodType<Prisma.rentalsCreateNestedOneWithoutPaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateNestedOneWithoutPaymentsInput>;
export const rentalsCreateNestedOneWithoutPaymentsInputObjectZodSchema = makeSchema();
