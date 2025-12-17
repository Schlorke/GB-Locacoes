import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DeliverySelectObjectSchema as DeliverySelectObjectSchema } from './objects/DeliverySelect.schema';
import { DeliveryIncludeObjectSchema as DeliveryIncludeObjectSchema } from './objects/DeliveryInclude.schema';
import { DeliveryWhereUniqueInputObjectSchema as DeliveryWhereUniqueInputObjectSchema } from './objects/DeliveryWhereUniqueInput.schema';

export const DeliveryDeleteOneSchema: z.ZodType<Prisma.DeliveryDeleteArgs> = z.object({ select: DeliverySelectObjectSchema.optional(), include: DeliveryIncludeObjectSchema.optional(), where: DeliveryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DeliveryDeleteArgs>;

export const DeliveryDeleteOneZodSchema = z.object({ select: DeliverySelectObjectSchema.optional(), include: DeliveryIncludeObjectSchema.optional(), where: DeliveryWhereUniqueInputObjectSchema }).strict();