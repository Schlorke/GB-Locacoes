import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsWhereUniqueInputObjectSchema as rental_itemsWhereUniqueInputObjectSchema } from './rental_itemsWhereUniqueInput.schema';
import { rental_itemsUpdateWithoutRentalsInputObjectSchema as rental_itemsUpdateWithoutRentalsInputObjectSchema } from './rental_itemsUpdateWithoutRentalsInput.schema';
import { rental_itemsUncheckedUpdateWithoutRentalsInputObjectSchema as rental_itemsUncheckedUpdateWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedUpdateWithoutRentalsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => rental_itemsUpdateWithoutRentalsInputObjectSchema), z.lazy(() => rental_itemsUncheckedUpdateWithoutRentalsInputObjectSchema)])
}).strict();
export const rental_itemsUpdateWithWhereUniqueWithoutRentalsInputObjectSchema: z.ZodType<Prisma.rental_itemsUpdateWithWhereUniqueWithoutRentalsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUpdateWithWhereUniqueWithoutRentalsInput>;
export const rental_itemsUpdateWithWhereUniqueWithoutRentalsInputObjectZodSchema = makeSchema();
