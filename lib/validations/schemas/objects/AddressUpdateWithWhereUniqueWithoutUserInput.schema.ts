import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressWhereUniqueInputObjectSchema } from './AddressWhereUniqueInput.schema';
import { AddressUpdateWithoutUserInputObjectSchema } from './AddressUpdateWithoutUserInput.schema';
import { AddressUncheckedUpdateWithoutUserInputObjectSchema } from './AddressUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AddressWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AddressUpdateWithoutUserInputObjectSchema), z.lazy(() => AddressUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const AddressUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AddressUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AddressUpdateWithWhereUniqueWithoutUserInput>;
export const AddressUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
