import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VehicleCreateManyInputObjectSchema as VehicleCreateManyInputObjectSchema } from './objects/VehicleCreateManyInput.schema';

export const VehicleCreateManySchema: z.ZodType<Prisma.VehicleCreateManyArgs> = z.object({ data: z.union([ VehicleCreateManyInputObjectSchema, z.array(VehicleCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.VehicleCreateManyArgs>;

export const VehicleCreateManyZodSchema = z.object({ data: z.union([ VehicleCreateManyInputObjectSchema, z.array(VehicleCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();