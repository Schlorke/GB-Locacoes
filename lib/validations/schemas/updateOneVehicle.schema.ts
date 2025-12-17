import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VehicleSelectObjectSchema as VehicleSelectObjectSchema } from './objects/VehicleSelect.schema';
import { VehicleUpdateInputObjectSchema as VehicleUpdateInputObjectSchema } from './objects/VehicleUpdateInput.schema';
import { VehicleUncheckedUpdateInputObjectSchema as VehicleUncheckedUpdateInputObjectSchema } from './objects/VehicleUncheckedUpdateInput.schema';
import { VehicleWhereUniqueInputObjectSchema as VehicleWhereUniqueInputObjectSchema } from './objects/VehicleWhereUniqueInput.schema';

export const VehicleUpdateOneSchema: z.ZodType<Prisma.VehicleUpdateArgs> = z.object({ select: VehicleSelectObjectSchema.optional(),  data: z.union([VehicleUpdateInputObjectSchema, VehicleUncheckedUpdateInputObjectSchema]), where: VehicleWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.VehicleUpdateArgs>;

export const VehicleUpdateOneZodSchema = z.object({ select: VehicleSelectObjectSchema.optional(),  data: z.union([VehicleUpdateInputObjectSchema, VehicleUncheckedUpdateInputObjectSchema]), where: VehicleWhereUniqueInputObjectSchema }).strict();