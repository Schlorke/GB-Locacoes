import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryWhereUniqueInputObjectSchema as DeliveryWhereUniqueInputObjectSchema } from './DeliveryWhereUniqueInput.schema';
import { DeliveryUpdateWithoutRentalInputObjectSchema as DeliveryUpdateWithoutRentalInputObjectSchema } from './DeliveryUpdateWithoutRentalInput.schema';
import { DeliveryUncheckedUpdateWithoutRentalInputObjectSchema as DeliveryUncheckedUpdateWithoutRentalInputObjectSchema } from './DeliveryUncheckedUpdateWithoutRentalInput.schema';
import { DeliveryCreateWithoutRentalInputObjectSchema as DeliveryCreateWithoutRentalInputObjectSchema } from './DeliveryCreateWithoutRentalInput.schema';
import { DeliveryUncheckedCreateWithoutRentalInputObjectSchema as DeliveryUncheckedCreateWithoutRentalInputObjectSchema } from './DeliveryUncheckedCreateWithoutRentalInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DeliveryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => DeliveryUpdateWithoutRentalInputObjectSchema), z.lazy(() => DeliveryUncheckedUpdateWithoutRentalInputObjectSchema)]),
  create: z.union([z.lazy(() => DeliveryCreateWithoutRentalInputObjectSchema), z.lazy(() => DeliveryUncheckedCreateWithoutRentalInputObjectSchema)])
}).strict();
export const DeliveryUpsertWithWhereUniqueWithoutRentalInputObjectSchema: z.ZodType<Prisma.DeliveryUpsertWithWhereUniqueWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryUpsertWithWhereUniqueWithoutRentalInput>;
export const DeliveryUpsertWithWhereUniqueWithoutRentalInputObjectZodSchema = makeSchema();
