import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentUnitSelectObjectSchema as EquipmentUnitSelectObjectSchema } from './objects/EquipmentUnitSelect.schema';
import { EquipmentUnitIncludeObjectSchema as EquipmentUnitIncludeObjectSchema } from './objects/EquipmentUnitInclude.schema';
import { EquipmentUnitWhereUniqueInputObjectSchema as EquipmentUnitWhereUniqueInputObjectSchema } from './objects/EquipmentUnitWhereUniqueInput.schema';
import { EquipmentUnitCreateInputObjectSchema as EquipmentUnitCreateInputObjectSchema } from './objects/EquipmentUnitCreateInput.schema';
import { EquipmentUnitUncheckedCreateInputObjectSchema as EquipmentUnitUncheckedCreateInputObjectSchema } from './objects/EquipmentUnitUncheckedCreateInput.schema';
import { EquipmentUnitUpdateInputObjectSchema as EquipmentUnitUpdateInputObjectSchema } from './objects/EquipmentUnitUpdateInput.schema';
import { EquipmentUnitUncheckedUpdateInputObjectSchema as EquipmentUnitUncheckedUpdateInputObjectSchema } from './objects/EquipmentUnitUncheckedUpdateInput.schema';

export const EquipmentUnitUpsertOneSchema: z.ZodType<Prisma.EquipmentUnitUpsertArgs> = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), include: EquipmentUnitIncludeObjectSchema.optional(), where: EquipmentUnitWhereUniqueInputObjectSchema, create: z.union([ EquipmentUnitCreateInputObjectSchema, EquipmentUnitUncheckedCreateInputObjectSchema ]), update: z.union([ EquipmentUnitUpdateInputObjectSchema, EquipmentUnitUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.EquipmentUnitUpsertArgs>;

export const EquipmentUnitUpsertOneZodSchema = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), include: EquipmentUnitIncludeObjectSchema.optional(), where: EquipmentUnitWhereUniqueInputObjectSchema, create: z.union([ EquipmentUnitCreateInputObjectSchema, EquipmentUnitUncheckedCreateInputObjectSchema ]), update: z.union([ EquipmentUnitUpdateInputObjectSchema, EquipmentUnitUncheckedUpdateInputObjectSchema ]) }).strict();