import { z } from 'zod';

export const Rental_itemsScalarFieldEnumSchema = z.enum(['id', 'rentalid', 'equipmentid', 'quantity', 'priceperday', 'totaldays', 'totalprice', 'createdat', 'updatedat'])