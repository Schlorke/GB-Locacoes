import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsScalarWhereInputObjectSchema } from './rental_itemsScalarWhereInput.schema';
import { rental_itemsUpdateManyMutationInputObjectSchema } from './rental_itemsUpdateManyMutationInput.schema';
import { rental_itemsUncheckedUpdateManyWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedUpdateManyWithoutEquipmentsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => rental_itemsScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => rental_itemsUpdateManyMutationInputObjectSchema), z.lazy(() => rental_itemsUncheckedUpdateManyWithoutEquipmentsInputObjectSchema)])
}).strict();
export const rental_itemsUpdateManyWithWhereWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsUpdateManyWithWhereWithoutEquipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUpdateManyWithWhereWithoutEquipmentsInput>;
export const rental_itemsUpdateManyWithWhereWithoutEquipmentsInputObjectZodSchema = makeSchema();
