/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryWhereUniqueInputObjectSchema as DeliveryWhereUniqueInputObjectSchema } from './DeliveryWhereUniqueInput.schema';
import { DeliveryUpdateWithoutRentalInputObjectSchema as DeliveryUpdateWithoutRentalInputObjectSchema } from './DeliveryUpdateWithoutRentalInput.schema';
import { DeliveryUncheckedUpdateWithoutRentalInputObjectSchema as DeliveryUncheckedUpdateWithoutRentalInputObjectSchema } from './DeliveryUncheckedUpdateWithoutRentalInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DeliveryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => DeliveryUpdateWithoutRentalInputObjectSchema), z.lazy(() => DeliveryUncheckedUpdateWithoutRentalInputObjectSchema)])
}).strict();
export const DeliveryUpdateWithWhereUniqueWithoutRentalInputObjectSchema: z.ZodType<Prisma.DeliveryUpdateWithWhereUniqueWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryUpdateWithWhereUniqueWithoutRentalInput>;
export const DeliveryUpdateWithWhereUniqueWithoutRentalInputObjectZodSchema = makeSchema();
