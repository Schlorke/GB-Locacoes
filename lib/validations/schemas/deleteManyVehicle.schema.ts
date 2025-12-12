/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VehicleWhereInputObjectSchema as VehicleWhereInputObjectSchema } from './objects/VehicleWhereInput.schema';

export const VehicleDeleteManySchema: z.ZodType<Prisma.VehicleDeleteManyArgs> = z.object({ where: VehicleWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.VehicleDeleteManyArgs>;

export const VehicleDeleteManyZodSchema = z.object({ where: VehicleWhereInputObjectSchema.optional() }).strict();