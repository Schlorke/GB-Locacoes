/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateManyCategoryInputObjectSchema as EquipmentCreateManyCategoryInputObjectSchema } from './EquipmentCreateManyCategoryInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => EquipmentCreateManyCategoryInputObjectSchema), z.lazy(() => EquipmentCreateManyCategoryInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const EquipmentCreateManyCategoryInputEnvelopeObjectSchema: z.ZodType<Prisma.EquipmentCreateManyCategoryInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateManyCategoryInputEnvelope>;
export const EquipmentCreateManyCategoryInputEnvelopeObjectZodSchema = makeSchema();
