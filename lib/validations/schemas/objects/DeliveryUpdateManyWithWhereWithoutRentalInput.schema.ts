/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryScalarWhereInputObjectSchema as DeliveryScalarWhereInputObjectSchema } from './DeliveryScalarWhereInput.schema';
import { DeliveryUpdateManyMutationInputObjectSchema as DeliveryUpdateManyMutationInputObjectSchema } from './DeliveryUpdateManyMutationInput.schema';
import { DeliveryUncheckedUpdateManyWithoutRentalInputObjectSchema as DeliveryUncheckedUpdateManyWithoutRentalInputObjectSchema } from './DeliveryUncheckedUpdateManyWithoutRentalInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DeliveryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => DeliveryUpdateManyMutationInputObjectSchema), z.lazy(() => DeliveryUncheckedUpdateManyWithoutRentalInputObjectSchema)])
}).strict();
export const DeliveryUpdateManyWithWhereWithoutRentalInputObjectSchema: z.ZodType<Prisma.DeliveryUpdateManyWithWhereWithoutRentalInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryUpdateManyWithWhereWithoutRentalInput>;
export const DeliveryUpdateManyWithWhereWithoutRentalInputObjectZodSchema = makeSchema();
