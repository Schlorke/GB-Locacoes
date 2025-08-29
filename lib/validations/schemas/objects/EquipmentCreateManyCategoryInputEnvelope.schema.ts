import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateManyCategoryInputObjectSchema } from './EquipmentCreateManyCategoryInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => EquipmentCreateManyCategoryInputObjectSchema), z.lazy(() => EquipmentCreateManyCategoryInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const EquipmentCreateManyCategoryInputEnvelopeObjectSchema: z.ZodType<Prisma.EquipmentCreateManyCategoryInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateManyCategoryInputEnvelope>;
export const EquipmentCreateManyCategoryInputEnvelopeObjectZodSchema = makeSchema();
