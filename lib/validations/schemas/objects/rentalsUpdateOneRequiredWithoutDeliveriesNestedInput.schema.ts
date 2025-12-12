/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsCreateWithoutDeliveriesInputObjectSchema as rentalsCreateWithoutDeliveriesInputObjectSchema } from './rentalsCreateWithoutDeliveriesInput.schema';
import { rentalsUncheckedCreateWithoutDeliveriesInputObjectSchema as rentalsUncheckedCreateWithoutDeliveriesInputObjectSchema } from './rentalsUncheckedCreateWithoutDeliveriesInput.schema';
import { rentalsCreateOrConnectWithoutDeliveriesInputObjectSchema as rentalsCreateOrConnectWithoutDeliveriesInputObjectSchema } from './rentalsCreateOrConnectWithoutDeliveriesInput.schema';
import { rentalsUpsertWithoutDeliveriesInputObjectSchema as rentalsUpsertWithoutDeliveriesInputObjectSchema } from './rentalsUpsertWithoutDeliveriesInput.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsUpdateToOneWithWhereWithoutDeliveriesInputObjectSchema as rentalsUpdateToOneWithWhereWithoutDeliveriesInputObjectSchema } from './rentalsUpdateToOneWithWhereWithoutDeliveriesInput.schema';
import { rentalsUpdateWithoutDeliveriesInputObjectSchema as rentalsUpdateWithoutDeliveriesInputObjectSchema } from './rentalsUpdateWithoutDeliveriesInput.schema';
import { rentalsUncheckedUpdateWithoutDeliveriesInputObjectSchema as rentalsUncheckedUpdateWithoutDeliveriesInputObjectSchema } from './rentalsUncheckedUpdateWithoutDeliveriesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutDeliveriesInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutDeliveriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => rentalsCreateOrConnectWithoutDeliveriesInputObjectSchema).optional(),
  upsert: z.lazy(() => rentalsUpsertWithoutDeliveriesInputObjectSchema).optional(),
  connect: z.lazy(() => rentalsWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => rentalsUpdateToOneWithWhereWithoutDeliveriesInputObjectSchema), z.lazy(() => rentalsUpdateWithoutDeliveriesInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutDeliveriesInputObjectSchema)]).optional()
}).strict();
export const rentalsUpdateOneRequiredWithoutDeliveriesNestedInputObjectSchema: z.ZodType<Prisma.rentalsUpdateOneRequiredWithoutDeliveriesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateOneRequiredWithoutDeliveriesNestedInput>;
export const rentalsUpdateOneRequiredWithoutDeliveriesNestedInputObjectZodSchema = makeSchema();
