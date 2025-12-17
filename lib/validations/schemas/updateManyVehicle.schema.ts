/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VehicleUpdateManyMutationInputObjectSchema as VehicleUpdateManyMutationInputObjectSchema } from './objects/VehicleUpdateManyMutationInput.schema';
import { VehicleWhereInputObjectSchema as VehicleWhereInputObjectSchema } from './objects/VehicleWhereInput.schema';

export const VehicleUpdateManySchema: z.ZodType<Prisma.VehicleUpdateManyArgs> = z.object({ data: VehicleUpdateManyMutationInputObjectSchema, where: VehicleWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.VehicleUpdateManyArgs>;

export const VehicleUpdateManyZodSchema = z.object({ data: VehicleUpdateManyMutationInputObjectSchema, where: VehicleWhereInputObjectSchema.optional() }).strict();