/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DeliveryCreateManyInputObjectSchema as DeliveryCreateManyInputObjectSchema } from './objects/DeliveryCreateManyInput.schema';

export const DeliveryCreateManySchema: z.ZodType<Prisma.DeliveryCreateManyArgs> = z.object({ data: z.union([ DeliveryCreateManyInputObjectSchema, z.array(DeliveryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.DeliveryCreateManyArgs>;

export const DeliveryCreateManyZodSchema = z.object({ data: z.union([ DeliveryCreateManyInputObjectSchema, z.array(DeliveryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();