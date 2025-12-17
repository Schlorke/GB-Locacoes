import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VehicleSelectObjectSchema as VehicleSelectObjectSchema } from './objects/VehicleSelect.schema';
import { VehicleWhereUniqueInputObjectSchema as VehicleWhereUniqueInputObjectSchema } from './objects/VehicleWhereUniqueInput.schema';

export const VehicleFindUniqueOrThrowSchema: z.ZodType<Prisma.VehicleFindUniqueOrThrowArgs> = z.object({ select: VehicleSelectObjectSchema.optional(),  where: VehicleWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.VehicleFindUniqueOrThrowArgs>;

export const VehicleFindUniqueOrThrowZodSchema = z.object({ select: VehicleSelectObjectSchema.optional(),  where: VehicleWhereUniqueInputObjectSchema }).strict();