import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressWhereUniqueInputObjectSchema as AddressWhereUniqueInputObjectSchema } from './AddressWhereUniqueInput.schema';
import { AddressCreateWithoutUserInputObjectSchema as AddressCreateWithoutUserInputObjectSchema } from './AddressCreateWithoutUserInput.schema';
import { AddressUncheckedCreateWithoutUserInputObjectSchema as AddressUncheckedCreateWithoutUserInputObjectSchema } from './AddressUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AddressWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AddressCreateWithoutUserInputObjectSchema), z.lazy(() => AddressUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AddressCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.AddressCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AddressCreateOrConnectWithoutUserInput>;
export const AddressCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
