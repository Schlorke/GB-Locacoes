/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryWhereUniqueInputObjectSchema as DeliveryWhereUniqueInputObjectSchema } from './DeliveryWhereUniqueInput.schema';
import { DeliveryCreateWithoutRentalInputObjectSchema as DeliveryCreateWithoutRentalInputObjectSchema } from './DeliveryCreateWithoutRentalInput.schema';
import { DeliveryUncheckedCreateWithoutRentalInputObjectSchema as DeliveryUncheckedCreateWithoutRentalInputObjectSchema } from './DeliveryUncheckedCreateWithoutRentalInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DeliveryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => DeliveryCreateWithoutRentalInputObjectSchema), z.lazy(() => DeliveryUncheckedCreateWithoutRentalInputObjectSchema)])
}).strict();
export const DeliveryCreateOrConnectWithoutRentalInputObjectSchema: z.ZodType<Prisma.DeliveryCreateOrConnectWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryCreateOrConnectWithoutRentalInput>;
export const DeliveryCreateOrConnectWithoutRentalInputObjectZodSchema = makeSchema();
