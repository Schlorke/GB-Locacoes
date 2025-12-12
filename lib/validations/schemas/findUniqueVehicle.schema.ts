/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VehicleSelectObjectSchema as VehicleSelectObjectSchema } from './objects/VehicleSelect.schema';
import { VehicleWhereUniqueInputObjectSchema as VehicleWhereUniqueInputObjectSchema } from './objects/VehicleWhereUniqueInput.schema';

export const VehicleFindUniqueSchema: z.ZodType<Prisma.VehicleFindUniqueArgs> = z.object({ select: VehicleSelectObjectSchema.optional(),  where: VehicleWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.VehicleFindUniqueArgs>;

export const VehicleFindUniqueZodSchema = z.object({ select: VehicleSelectObjectSchema.optional(),  where: VehicleWhereUniqueInputObjectSchema }).strict();