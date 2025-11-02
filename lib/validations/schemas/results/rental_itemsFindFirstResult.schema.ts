import * as z from 'zod';
export const rental_itemsFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  rentalid: z.string(),
  equipmentid: z.string(),
  quantity: z.number().int(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().optional(),
  updatedat: z.date().optional(),
  equipments: z.unknown(),
  rentals: z.unknown()
}));