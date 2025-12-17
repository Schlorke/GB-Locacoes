import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaintenanceSelectObjectSchema as MaintenanceSelectObjectSchema } from './objects/MaintenanceSelect.schema';
import { MaintenanceIncludeObjectSchema as MaintenanceIncludeObjectSchema } from './objects/MaintenanceInclude.schema';
import { MaintenanceWhereUniqueInputObjectSchema as MaintenanceWhereUniqueInputObjectSchema } from './objects/MaintenanceWhereUniqueInput.schema';
import { MaintenanceCreateInputObjectSchema as MaintenanceCreateInputObjectSchema } from './objects/MaintenanceCreateInput.schema';
import { MaintenanceUncheckedCreateInputObjectSchema as MaintenanceUncheckedCreateInputObjectSchema } from './objects/MaintenanceUncheckedCreateInput.schema';
import { MaintenanceUpdateInputObjectSchema as MaintenanceUpdateInputObjectSchema } from './objects/MaintenanceUpdateInput.schema';
import { MaintenanceUncheckedUpdateInputObjectSchema as MaintenanceUncheckedUpdateInputObjectSchema } from './objects/MaintenanceUncheckedUpdateInput.schema';

export const MaintenanceUpsertOneSchema: z.ZodType<Prisma.MaintenanceUpsertArgs> = z.object({ select: MaintenanceSelectObjectSchema.optional(), include: MaintenanceIncludeObjectSchema.optional(), where: MaintenanceWhereUniqueInputObjectSchema, create: z.union([ MaintenanceCreateInputObjectSchema, MaintenanceUncheckedCreateInputObjectSchema ]), update: z.union([ MaintenanceUpdateInputObjectSchema, MaintenanceUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.MaintenanceUpsertArgs>;

export const MaintenanceUpsertOneZodSchema = z.object({ select: MaintenanceSelectObjectSchema.optional(), include: MaintenanceIncludeObjectSchema.optional(), where: MaintenanceWhereUniqueInputObjectSchema, create: z.union([ MaintenanceCreateInputObjectSchema, MaintenanceUncheckedCreateInputObjectSchema ]), update: z.union([ MaintenanceUpdateInputObjectSchema, MaintenanceUncheckedUpdateInputObjectSchema ]) }).strict();