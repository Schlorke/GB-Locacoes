import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsCreateWithoutDeliveriesInputObjectSchema as rentalsCreateWithoutDeliveriesInputObjectSchema } from './rentalsCreateWithoutDeliveriesInput.schema';
import { rentalsUncheckedCreateWithoutDeliveriesInputObjectSchema as rentalsUncheckedCreateWithoutDeliveriesInputObjectSchema } from './rentalsUncheckedCreateWithoutDeliveriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => rentalsCreateWithoutDeliveriesInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutDeliveriesInputObjectSchema)])
}).strict();
export const rentalsCreateOrConnectWithoutDeliveriesInputObjectSchema: z.ZodType<Prisma.rentalsCreateOrConnectWithoutDeliveriesInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateOrConnectWithoutDeliveriesInput>;
export const rentalsCreateOrConnectWithoutDeliveriesInputObjectZodSchema = makeSchema();
