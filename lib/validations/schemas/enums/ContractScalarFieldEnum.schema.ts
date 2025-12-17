import * as z from 'zod';

export const ContractScalarFieldEnumSchema = z.enum(['id', 'rentalId', 'template', 'content', 'pdfUrl', 'signedAt', 'signedBy', 'zapSignId', 'status', 'createdAt', 'updatedAt'])

export type ContractScalarFieldEnum = z.infer<typeof ContractScalarFieldEnumSchema>;