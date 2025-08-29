import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsCreateManyUsersInputObjectSchema } from './rentalsCreateManyUsersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => rentalsCreateManyUsersInputObjectSchema), z.lazy(() => rentalsCreateManyUsersInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const rentalsCreateManyUsersInputEnvelopeObjectSchema: z.ZodType<Prisma.rentalsCreateManyUsersInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateManyUsersInputEnvelope>;
export const rentalsCreateManyUsersInputEnvelopeObjectZodSchema = makeSchema();
