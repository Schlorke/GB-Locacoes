import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DeliverySelectObjectSchema as DeliverySelectObjectSchema } from './objects/DeliverySelect.schema';
import { DeliveryIncludeObjectSchema as DeliveryIncludeObjectSchema } from './objects/DeliveryInclude.schema';
import { DeliveryWhereUniqueInputObjectSchema as DeliveryWhereUniqueInputObjectSchema } from './objects/DeliveryWhereUniqueInput.schema';
import { DeliveryCreateInputObjectSchema as DeliveryCreateInputObjectSchema } from './objects/DeliveryCreateInput.schema';
import { DeliveryUncheckedCreateInputObjectSchema as DeliveryUncheckedCreateInputObjectSchema } from './objects/DeliveryUncheckedCreateInput.schema';
import { DeliveryUpdateInputObjectSchema as DeliveryUpdateInputObjectSchema } from './objects/DeliveryUpdateInput.schema';
import { DeliveryUncheckedUpdateInputObjectSchema as DeliveryUncheckedUpdateInputObjectSchema } from './objects/DeliveryUncheckedUpdateInput.schema';

export const DeliveryUpsertOneSchema: z.ZodType<Prisma.DeliveryUpsertArgs> = z.object({ select: DeliverySelectObjectSchema.optional(), include: DeliveryIncludeObjectSchema.optional(), where: DeliveryWhereUniqueInputObjectSchema, create: z.union([ DeliveryCreateInputObjectSchema, DeliveryUncheckedCreateInputObjectSchema ]), update: z.union([ DeliveryUpdateInputObjectSchema, DeliveryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.DeliveryUpsertArgs>;

export const DeliveryUpsertOneZodSchema = z.object({ select: DeliverySelectObjectSchema.optional(), include: DeliveryIncludeObjectSchema.optional(), where: DeliveryWhereUniqueInputObjectSchema, create: z.union([ DeliveryCreateInputObjectSchema, DeliveryUncheckedCreateInputObjectSchema ]), update: z.union([ DeliveryUpdateInputObjectSchema, DeliveryUncheckedUpdateInputObjectSchema ]) }).strict();