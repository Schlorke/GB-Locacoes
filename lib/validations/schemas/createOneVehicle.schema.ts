import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VehicleSelectObjectSchema as VehicleSelectObjectSchema } from './objects/VehicleSelect.schema';
import { VehicleCreateInputObjectSchema as VehicleCreateInputObjectSchema } from './objects/VehicleCreateInput.schema';
import { VehicleUncheckedCreateInputObjectSchema as VehicleUncheckedCreateInputObjectSchema } from './objects/VehicleUncheckedCreateInput.schema';

export const VehicleCreateOneSchema: z.ZodType<Prisma.VehicleCreateArgs> = z.object({ select: VehicleSelectObjectSchema.optional(),  data: z.union([VehicleCreateInputObjectSchema, VehicleUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.VehicleCreateArgs>;

export const VehicleCreateOneZodSchema = z.object({ select: VehicleSelectObjectSchema.optional(),  data: z.union([VehicleCreateInputObjectSchema, VehicleUncheckedCreateInputObjectSchema]) }).strict();