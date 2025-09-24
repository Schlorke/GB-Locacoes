import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressCreateWithoutUserInputObjectSchema } from './AddressCreateWithoutUserInput.schema';
import { AddressUncheckedCreateWithoutUserInputObjectSchema } from './AddressUncheckedCreateWithoutUserInput.schema';
import { AddressCreateOrConnectWithoutUserInputObjectSchema } from './AddressCreateOrConnectWithoutUserInput.schema';
import { AddressCreateManyUserInputEnvelopeObjectSchema } from './AddressCreateManyUserInputEnvelope.schema';
import { AddressWhereUniqueInputObjectSchema } from './AddressWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AddressCreateWithoutUserInputObjectSchema), z.lazy(() => AddressCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AddressUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AddressUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AddressCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AddressCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AddressCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AddressWhereUniqueInputObjectSchema), z.lazy(() => AddressWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AddressCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.AddressCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AddressCreateNestedManyWithoutUserInput>;
export const AddressCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
