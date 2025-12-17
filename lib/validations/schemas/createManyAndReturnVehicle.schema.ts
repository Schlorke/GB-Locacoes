import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VehicleSelectObjectSchema as VehicleSelectObjectSchema } from './objects/VehicleSelect.schema';
import { VehicleCreateManyInputObjectSchema as VehicleCreateManyInputObjectSchema } from './objects/VehicleCreateManyInput.schema';

export const VehicleCreateManyAndReturnSchema: z.ZodType<Prisma.VehicleCreateManyAndReturnArgs> = z.object({ select: VehicleSelectObjectSchema.optional(), data: z.union([ VehicleCreateManyInputObjectSchema, z.array(VehicleCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.VehicleCreateManyAndReturnArgs>;

export const VehicleCreateManyAndReturnZodSchema = z.object({ select: VehicleSelectObjectSchema.optional(), data: z.union([ VehicleCreateManyInputObjectSchema, z.array(VehicleCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();