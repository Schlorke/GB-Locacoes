/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DeliverySelectObjectSchema as DeliverySelectObjectSchema } from './objects/DeliverySelect.schema';
import { DeliveryIncludeObjectSchema as DeliveryIncludeObjectSchema } from './objects/DeliveryInclude.schema';
import { DeliveryWhereUniqueInputObjectSchema as DeliveryWhereUniqueInputObjectSchema } from './objects/DeliveryWhereUniqueInput.schema';

export const DeliveryFindUniqueOrThrowSchema: z.ZodType<Prisma.DeliveryFindUniqueOrThrowArgs> = z.object({ select: DeliverySelectObjectSchema.optional(), include: DeliveryIncludeObjectSchema.optional(), where: DeliveryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DeliveryFindUniqueOrThrowArgs>;

export const DeliveryFindUniqueOrThrowZodSchema = z.object({ select: DeliverySelectObjectSchema.optional(), include: DeliveryIncludeObjectSchema.optional(), where: DeliveryWhereUniqueInputObjectSchema }).strict();