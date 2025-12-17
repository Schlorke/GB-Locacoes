import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressCreateManyUserInputObjectSchema as AddressCreateManyUserInputObjectSchema } from './AddressCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AddressCreateManyUserInputObjectSchema), z.lazy(() => AddressCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AddressCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.AddressCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AddressCreateManyUserInputEnvelope>;
export const AddressCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
