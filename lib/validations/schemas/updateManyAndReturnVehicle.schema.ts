/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VehicleSelectObjectSchema as VehicleSelectObjectSchema } from './objects/VehicleSelect.schema';
import { VehicleUpdateManyMutationInputObjectSchema as VehicleUpdateManyMutationInputObjectSchema } from './objects/VehicleUpdateManyMutationInput.schema';
import { VehicleWhereInputObjectSchema as VehicleWhereInputObjectSchema } from './objects/VehicleWhereInput.schema';

export const VehicleUpdateManyAndReturnSchema: z.ZodType<Prisma.VehicleUpdateManyAndReturnArgs> = z.object({ select: VehicleSelectObjectSchema.optional(), data: VehicleUpdateManyMutationInputObjectSchema, where: VehicleWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.VehicleUpdateManyAndReturnArgs>;

export const VehicleUpdateManyAndReturnZodSchema = z.object({ select: VehicleSelectObjectSchema.optional(), data: VehicleUpdateManyMutationInputObjectSchema, where: VehicleWhereInputObjectSchema.optional() }).strict();