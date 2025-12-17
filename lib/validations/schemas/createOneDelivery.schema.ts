import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DeliverySelectObjectSchema as DeliverySelectObjectSchema } from './objects/DeliverySelect.schema';
import { DeliveryIncludeObjectSchema as DeliveryIncludeObjectSchema } from './objects/DeliveryInclude.schema';
import { DeliveryCreateInputObjectSchema as DeliveryCreateInputObjectSchema } from './objects/DeliveryCreateInput.schema';
import { DeliveryUncheckedCreateInputObjectSchema as DeliveryUncheckedCreateInputObjectSchema } from './objects/DeliveryUncheckedCreateInput.schema';

export const DeliveryCreateOneSchema: z.ZodType<Prisma.DeliveryCreateArgs> = z.object({ select: DeliverySelectObjectSchema.optional(), include: DeliveryIncludeObjectSchema.optional(), data: z.union([DeliveryCreateInputObjectSchema, DeliveryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.DeliveryCreateArgs>;

export const DeliveryCreateOneZodSchema = z.object({ select: DeliverySelectObjectSchema.optional(), include: DeliveryIncludeObjectSchema.optional(), data: z.union([DeliveryCreateInputObjectSchema, DeliveryUncheckedCreateInputObjectSchema]) }).strict();