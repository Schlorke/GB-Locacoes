/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryCreateWithoutRentalInputObjectSchema as DeliveryCreateWithoutRentalInputObjectSchema } from './DeliveryCreateWithoutRentalInput.schema';
import { DeliveryUncheckedCreateWithoutRentalInputObjectSchema as DeliveryUncheckedCreateWithoutRentalInputObjectSchema } from './DeliveryUncheckedCreateWithoutRentalInput.schema';
import { DeliveryCreateOrConnectWithoutRentalInputObjectSchema as DeliveryCreateOrConnectWithoutRentalInputObjectSchema } from './DeliveryCreateOrConnectWithoutRentalInput.schema';
import { DeliveryCreateManyRentalInputEnvelopeObjectSchema as DeliveryCreateManyRentalInputEnvelopeObjectSchema } from './DeliveryCreateManyRentalInputEnvelope.schema';
import { DeliveryWhereUniqueInputObjectSchema as DeliveryWhereUniqueInputObjectSchema } from './DeliveryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => DeliveryCreateWithoutRentalInputObjectSchema), z.lazy(() => DeliveryCreateWithoutRentalInputObjectSchema).array(), z.lazy(() => DeliveryUncheckedCreateWithoutRentalInputObjectSchema), z.lazy(() => DeliveryUncheckedCreateWithoutRentalInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => DeliveryCreateOrConnectWithoutRentalInputObjectSchema), z.lazy(() => DeliveryCreateOrConnectWithoutRentalInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => DeliveryCreateManyRentalInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => DeliveryWhereUniqueInputObjectSchema), z.lazy(() => DeliveryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const DeliveryUncheckedCreateNestedManyWithoutRentalInputObjectSchema: z.ZodType<Prisma.DeliveryUncheckedCreateNestedManyWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryUncheckedCreateNestedManyWithoutRentalInput>;
export const DeliveryUncheckedCreateNestedManyWithoutRentalInputObjectZodSchema = makeSchema();
