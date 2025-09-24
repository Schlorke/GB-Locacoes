import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressWhereUniqueInputObjectSchema } from './AddressWhereUniqueInput.schema';
import { AddressUpdateWithoutUserInputObjectSchema } from './AddressUpdateWithoutUserInput.schema';
import { AddressUncheckedUpdateWithoutUserInputObjectSchema } from './AddressUncheckedUpdateWithoutUserInput.schema';
import { AddressCreateWithoutUserInputObjectSchema } from './AddressCreateWithoutUserInput.schema';
import { AddressUncheckedCreateWithoutUserInputObjectSchema } from './AddressUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AddressWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AddressUpdateWithoutUserInputObjectSchema), z.lazy(() => AddressUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AddressCreateWithoutUserInputObjectSchema), z.lazy(() => AddressUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AddressUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AddressUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AddressUpsertWithWhereUniqueWithoutUserInput>;
export const AddressUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
