/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DeliverySelectObjectSchema as DeliverySelectObjectSchema } from './objects/DeliverySelect.schema';
import { DeliveryCreateManyInputObjectSchema as DeliveryCreateManyInputObjectSchema } from './objects/DeliveryCreateManyInput.schema';

export const DeliveryCreateManyAndReturnSchema: z.ZodType<Prisma.DeliveryCreateManyAndReturnArgs> = z.object({ select: DeliverySelectObjectSchema.optional(), data: z.union([ DeliveryCreateManyInputObjectSchema, z.array(DeliveryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.DeliveryCreateManyAndReturnArgs>;

export const DeliveryCreateManyAndReturnZodSchema = z.object({ select: DeliverySelectObjectSchema.optional(), data: z.union([ DeliveryCreateManyInputObjectSchema, z.array(DeliveryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();