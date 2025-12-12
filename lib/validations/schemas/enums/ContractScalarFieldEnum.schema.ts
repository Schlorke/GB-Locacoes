/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const ContractScalarFieldEnumSchema = z.enum(['id', 'rentalId', 'template', 'content', 'pdfUrl', 'signedAt', 'signedBy', 'zapSignId', 'status', 'createdAt', 'updatedAt'])

export type ContractScalarFieldEnum = z.infer<typeof ContractScalarFieldEnumSchema>;