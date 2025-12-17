import * as z from 'zod';

export const ContractStatusSchema = z.enum(['DRAFT', 'SENT', 'SIGNED', 'EXPIRED', 'CANCELLED'])

export type ContractStatus = z.infer<typeof ContractStatusSchema>;