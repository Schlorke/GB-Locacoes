/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { EquipmentSelectObjectSchema as EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema';
import { EquipmentIncludeObjectSchema as EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema';
import { EquipmentCreateInputObjectSchema as EquipmentCreateInputObjectSchema } from './objects/EquipmentCreateInput.schema';
import { EquipmentUncheckedCreateInputObjectSchema as EquipmentUncheckedCreateInputObjectSchema } from './objects/EquipmentUncheckedCreateInput.schema';

export const EquipmentCreateOneSchema: z.ZodType<Prisma.EquipmentCreateArgs> = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), data: z.union([EquipmentCreateInputObjectSchema, EquipmentUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.EquipmentCreateArgs>;

export const EquipmentCreateOneZodSchema = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), data: z.union([EquipmentCreateInputObjectSchema, EquipmentUncheckedCreateInputObjectSchema]) }).strict();