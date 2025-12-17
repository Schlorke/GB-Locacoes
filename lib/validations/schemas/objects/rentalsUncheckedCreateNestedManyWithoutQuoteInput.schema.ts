import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsCreateWithoutQuoteInputObjectSchema as rentalsCreateWithoutQuoteInputObjectSchema } from './rentalsCreateWithoutQuoteInput.schema';
import { rentalsUncheckedCreateWithoutQuoteInputObjectSchema as rentalsUncheckedCreateWithoutQuoteInputObjectSchema } from './rentalsUncheckedCreateWithoutQuoteInput.schema';
import { rentalsCreateOrConnectWithoutQuoteInputObjectSchema as rentalsCreateOrConnectWithoutQuoteInputObjectSchema } from './rentalsCreateOrConnectWithoutQuoteInput.schema';
import { rentalsCreateManyQuoteInputEnvelopeObjectSchema as rentalsCreateManyQuoteInputEnvelopeObjectSchema } from './rentalsCreateManyQuoteInputEnvelope.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutQuoteInputObjectSchema), z.lazy(() => rentalsCreateWithoutQuoteInputObjectSchema).array(), z.lazy(() => rentalsUncheckedCreateWithoutQuoteInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutQuoteInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => rentalsCreateOrConnectWithoutQuoteInputObjectSchema), z.lazy(() => rentalsCreateOrConnectWithoutQuoteInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => rentalsCreateManyQuoteInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const rentalsUncheckedCreateNestedManyWithoutQuoteInputObjectSchema: z.ZodType<Prisma.rentalsUncheckedCreateNestedManyWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUncheckedCreateNestedManyWithoutQuoteInput>;
export const rentalsUncheckedCreateNestedManyWithoutQuoteInputObjectZodSchema = makeSchema();
