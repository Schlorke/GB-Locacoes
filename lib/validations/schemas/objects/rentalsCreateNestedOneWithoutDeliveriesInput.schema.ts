/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsCreateWithoutDeliveriesInputObjectSchema as rentalsCreateWithoutDeliveriesInputObjectSchema } from './rentalsCreateWithoutDeliveriesInput.schema';
import { rentalsUncheckedCreateWithoutDeliveriesInputObjectSchema as rentalsUncheckedCreateWithoutDeliveriesInputObjectSchema } from './rentalsUncheckedCreateWithoutDeliveriesInput.schema';
import { rentalsCreateOrConnectWithoutDeliveriesInputObjectSchema as rentalsCreateOrConnectWithoutDeliveriesInputObjectSchema } from './rentalsCreateOrConnectWithoutDeliveriesInput.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutDeliveriesInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutDeliveriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => rentalsCreateOrConnectWithoutDeliveriesInputObjectSchema).optional(),
  connect: z.lazy(() => rentalsWhereUniqueInputObjectSchema).optional()
}).strict();
export const rentalsCreateNestedOneWithoutDeliveriesInputObjectSchema: z.ZodType<Prisma.rentalsCreateNestedOneWithoutDeliveriesInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateNestedOneWithoutDeliveriesInput>;
export const rentalsCreateNestedOneWithoutDeliveriesInputObjectZodSchema = makeSchema();
