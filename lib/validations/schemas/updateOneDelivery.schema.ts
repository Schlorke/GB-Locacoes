import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DeliverySelectObjectSchema as DeliverySelectObjectSchema } from './objects/DeliverySelect.schema';
import { DeliveryIncludeObjectSchema as DeliveryIncludeObjectSchema } from './objects/DeliveryInclude.schema';
import { DeliveryUpdateInputObjectSchema as DeliveryUpdateInputObjectSchema } from './objects/DeliveryUpdateInput.schema';
import { DeliveryUncheckedUpdateInputObjectSchema as DeliveryUncheckedUpdateInputObjectSchema } from './objects/DeliveryUncheckedUpdateInput.schema';
import { DeliveryWhereUniqueInputObjectSchema as DeliveryWhereUniqueInputObjectSchema } from './objects/DeliveryWhereUniqueInput.schema';

export const DeliveryUpdateOneSchema: z.ZodType<Prisma.DeliveryUpdateArgs> = z.object({ select: DeliverySelectObjectSchema.optional(), include: DeliveryIncludeObjectSchema.optional(), data: z.union([DeliveryUpdateInputObjectSchema, DeliveryUncheckedUpdateInputObjectSchema]), where: DeliveryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DeliveryUpdateArgs>;

export const DeliveryUpdateOneZodSchema = z.object({ select: DeliverySelectObjectSchema.optional(), include: DeliveryIncludeObjectSchema.optional(), data: z.union([DeliveryUpdateInputObjectSchema, DeliveryUncheckedUpdateInputObjectSchema]), where: DeliveryWhereUniqueInputObjectSchema }).strict();