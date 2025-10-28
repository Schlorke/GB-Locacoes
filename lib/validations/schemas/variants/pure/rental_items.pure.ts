/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
// prettier-ignore
export const rental_itemsModelSchema = z.object({
    id: z.string(),
    rentalid: z.string(),
    equipmentid: z.string(),
    quantity: z.number().int(),
    priceperday: z.number(),
    totaldays: z.number().int(),
    totalprice: z.number(),
    createdat: z.date().nullable(),
    updatedat: z.date().nullable(),
    equipments: z.unknown(),
    rentals: z.unknown()
}).strict();

export type rental_itemsPureType = z.infer<typeof rental_itemsModelSchema>;
