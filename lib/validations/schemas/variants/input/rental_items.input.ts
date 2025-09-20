import { z } from 'zod'

// prettier-ignore
export const rental_itemsInputSchema = z.object({
    id: z.string(),
    rentalid: z.string(),
    equipmentid: z.string(),
    quantity: z.number().int(),
    priceperday: z.number(),
    totaldays: z.number().int(),
    totalprice: z.number(),
    createdat: z.date().optional().nullable(),
    updatedat: z.date().optional().nullable(),
    equipments: z.unknown(),
    rentals: z.unknown()
}).strict();

export type rental_itemsInputType = z.infer<typeof rental_itemsInputSchema>
