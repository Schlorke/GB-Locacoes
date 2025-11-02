import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressScalarWhereInputObjectSchema as AddressScalarWhereInputObjectSchema } from './AddressScalarWhereInput.schema';
import { AddressUpdateManyMutationInputObjectSchema as AddressUpdateManyMutationInputObjectSchema } from './AddressUpdateManyMutationInput.schema';
import { AddressUncheckedUpdateManyWithoutUserInputObjectSchema as AddressUncheckedUpdateManyWithoutUserInputObjectSchema } from './AddressUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AddressScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AddressUpdateManyMutationInputObjectSchema), z.lazy(() => AddressUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const AddressUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.AddressUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AddressUpdateManyWithWhereWithoutUserInput>;
export const AddressUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
