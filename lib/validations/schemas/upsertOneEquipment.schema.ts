import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentSelectObjectSchema as EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema';
import { EquipmentIncludeObjectSchema as EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema';
import { EquipmentCreateInputObjectSchema as EquipmentCreateInputObjectSchema } from './objects/EquipmentCreateInput.schema';
import { EquipmentUncheckedCreateInputObjectSchema as EquipmentUncheckedCreateInputObjectSchema } from './objects/EquipmentUncheckedCreateInput.schema';
import { EquipmentUpdateInputObjectSchema as EquipmentUpdateInputObjectSchema } from './objects/EquipmentUpdateInput.schema';
import { EquipmentUncheckedUpdateInputObjectSchema as EquipmentUncheckedUpdateInputObjectSchema } from './objects/EquipmentUncheckedUpdateInput.schema';

export const EquipmentUpsertOneSchema: z.ZodType<Prisma.EquipmentUpsertArgs> = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), where: EquipmentWhereUniqueInputObjectSchema, create: z.union([ EquipmentCreateInputObjectSchema, EquipmentUncheckedCreateInputObjectSchema ]), update: z.union([ EquipmentUpdateInputObjectSchema, EquipmentUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.EquipmentUpsertArgs>;

export const EquipmentUpsertOneZodSchema = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), where: EquipmentWhereUniqueInputObjectSchema, create: z.union([ EquipmentCreateInputObjectSchema, EquipmentUncheckedCreateInputObjectSchema ]), update: z.union([ EquipmentUpdateInputObjectSchema, EquipmentUncheckedUpdateInputObjectSchema ]) }).strict();