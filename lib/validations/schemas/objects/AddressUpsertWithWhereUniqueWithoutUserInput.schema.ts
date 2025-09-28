/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressWhereUniqueInputObjectSchema as AddressWhereUniqueInputObjectSchema } from './AddressWhereUniqueInput.schema';
import { AddressUpdateWithoutUserInputObjectSchema as AddressUpdateWithoutUserInputObjectSchema } from './AddressUpdateWithoutUserInput.schema';
import { AddressUncheckedUpdateWithoutUserInputObjectSchema as AddressUncheckedUpdateWithoutUserInputObjectSchema } from './AddressUncheckedUpdateWithoutUserInput.schema';
import { AddressCreateWithoutUserInputObjectSchema as AddressCreateWithoutUserInputObjectSchema } from './AddressCreateWithoutUserInput.schema';
import { AddressUncheckedCreateWithoutUserInputObjectSchema as AddressUncheckedCreateWithoutUserInputObjectSchema } from './AddressUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AddressWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AddressUpdateWithoutUserInputObjectSchema), z.lazy(() => AddressUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AddressCreateWithoutUserInputObjectSchema), z.lazy(() => AddressUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AddressUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AddressUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AddressUpsertWithWhereUniqueWithoutUserInput>;
export const AddressUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
