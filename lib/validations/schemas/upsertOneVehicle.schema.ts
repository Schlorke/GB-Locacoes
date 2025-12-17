import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VehicleSelectObjectSchema as VehicleSelectObjectSchema } from './objects/VehicleSelect.schema';
import { VehicleWhereUniqueInputObjectSchema as VehicleWhereUniqueInputObjectSchema } from './objects/VehicleWhereUniqueInput.schema';
import { VehicleCreateInputObjectSchema as VehicleCreateInputObjectSchema } from './objects/VehicleCreateInput.schema';
import { VehicleUncheckedCreateInputObjectSchema as VehicleUncheckedCreateInputObjectSchema } from './objects/VehicleUncheckedCreateInput.schema';
import { VehicleUpdateInputObjectSchema as VehicleUpdateInputObjectSchema } from './objects/VehicleUpdateInput.schema';
import { VehicleUncheckedUpdateInputObjectSchema as VehicleUncheckedUpdateInputObjectSchema } from './objects/VehicleUncheckedUpdateInput.schema';

export const VehicleUpsertOneSchema: z.ZodType<Prisma.VehicleUpsertArgs> = z.object({ select: VehicleSelectObjectSchema.optional(),  where: VehicleWhereUniqueInputObjectSchema, create: z.union([ VehicleCreateInputObjectSchema, VehicleUncheckedCreateInputObjectSchema ]), update: z.union([ VehicleUpdateInputObjectSchema, VehicleUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.VehicleUpsertArgs>;

export const VehicleUpsertOneZodSchema = z.object({ select: VehicleSelectObjectSchema.optional(),  where: VehicleWhereUniqueInputObjectSchema, create: z.union([ VehicleCreateInputObjectSchema, VehicleUncheckedCreateInputObjectSchema ]), update: z.union([ VehicleUpdateInputObjectSchema, VehicleUncheckedUpdateInputObjectSchema ]) }).strict();