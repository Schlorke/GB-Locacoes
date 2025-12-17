import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentFindManySchema as PaymentFindManySchema } from '../findManyPayment.schema';
import { QuoteItemFindManySchema as QuoteItemFindManySchema } from '../findManyQuoteItem.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { rentalsFindManySchema as rentalsFindManySchema } from '../findManyrentals.schema';
import { QuoteCountOutputTypeArgsObjectSchema as QuoteCountOutputTypeArgsObjectSchema } from './QuoteCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  company: z.boolean().optional(),
  message: z.boolean().optional(),
  total: z.boolean().optional(),
  status: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  cep: z.boolean().optional(),
  cnpj: z.boolean().optional(),
  cpf: z.boolean().optional(),
  adminNotes: z.boolean().optional(),
  approvedAt: z.boolean().optional(),
  approvedBy: z.boolean().optional(),
  convertedToRentalId: z.boolean().optional(),
  deliveryAddress: z.boolean().optional(),
  deliveryFee: z.boolean().optional(),
  deliveryType: z.boolean().optional(),
  deposit: z.boolean().optional(),
  discount: z.boolean().optional(),
  endDate: z.boolean().optional(),
  finalTotal: z.boolean().optional(),
  internalNotes: z.boolean().optional(),
  pickupFee: z.boolean().optional(),
  priority: z.boolean().optional(),
  rejectedAt: z.boolean().optional(),
  rejectedBy: z.boolean().optional(),
  rejectionReason: z.boolean().optional(),
  startDate: z.boolean().optional(),
  subtotal: z.boolean().optional(),
  taxes: z.boolean().optional(),
  validUntil: z.boolean().optional(),
  originalTotal: z.boolean().optional(),
  priceAdjustmentReason: z.boolean().optional(),
  priceAdjustedAt: z.boolean().optional(),
  priceAdjustedBy: z.boolean().optional(),
  lateFee: z.boolean().optional(),
  lateFeeApproved: z.boolean().optional(),
  lateFeeApprovedAt: z.boolean().optional(),
  lateFeeApprovedBy: z.boolean().optional(),
  damages: z.boolean().optional(),
  misuse: z.boolean().optional(),
  payments: z.union([z.boolean(), z.lazy(() => PaymentFindManySchema)]).optional(),
  items: z.union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)]).optional(),
  approvedByUser: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  rejectedByUser: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  rentals: z.union([z.boolean(), z.lazy(() => rentalsFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => QuoteCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const QuoteSelectObjectSchema: z.ZodType<Prisma.QuoteSelect> = makeSchema() as unknown as z.ZodType<Prisma.QuoteSelect>;
export const QuoteSelectObjectZodSchema = makeSchema();
