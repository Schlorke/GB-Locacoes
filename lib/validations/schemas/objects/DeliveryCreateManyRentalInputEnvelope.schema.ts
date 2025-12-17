import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryCreateManyRentalInputObjectSchema as DeliveryCreateManyRentalInputObjectSchema } from './DeliveryCreateManyRentalInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => DeliveryCreateManyRentalInputObjectSchema), z.lazy(() => DeliveryCreateManyRentalInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const DeliveryCreateManyRentalInputEnvelopeObjectSchema: z.ZodType<Prisma.DeliveryCreateManyRentalInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryCreateManyRentalInputEnvelope>;
export const DeliveryCreateManyRentalInputEnvelopeObjectZodSchema = makeSchema();
