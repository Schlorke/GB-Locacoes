/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SettingWhereInputObjectSchema as SettingWhereInputObjectSchema } from './objects/SettingWhereInput.schema';
import { SettingOrderByWithAggregationInputObjectSchema as SettingOrderByWithAggregationInputObjectSchema } from './objects/SettingOrderByWithAggregationInput.schema';
import { SettingScalarWhereWithAggregatesInputObjectSchema as SettingScalarWhereWithAggregatesInputObjectSchema } from './objects/SettingScalarWhereWithAggregatesInput.schema';
import { SettingScalarFieldEnumSchema as SettingScalarFieldEnum } from './enums/SettingScalarFieldEnum.schema';
import { SettingCountAggregateInputObjectSchema as SettingCountAggregateInputObjectSchema } from './objects/SettingCountAggregateInput.schema';
import { SettingMinAggregateInputObjectSchema as SettingMinAggregateInputObjectSchema } from './objects/SettingMinAggregateInput.schema';
import { SettingMaxAggregateInputObjectSchema as SettingMaxAggregateInputObjectSchema } from './objects/SettingMaxAggregateInput.schema';

export const SettingGroupBySchema: z.ZodType<Prisma.SettingGroupByArgs> = z.object({ where: SettingWhereInputObjectSchema.optional(), orderBy: z.union([SettingOrderByWithAggregationInputObjectSchema, SettingOrderByWithAggregationInputObjectSchema.array()]).optional(), having: SettingScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(SettingScalarFieldEnum), _count: z.union([ z.literal(true), SettingCountAggregateInputObjectSchema ]).optional(), _min: SettingMinAggregateInputObjectSchema.optional(), _max: SettingMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SettingGroupByArgs>;

export const SettingGroupByZodSchema = z.object({ where: SettingWhereInputObjectSchema.optional(), orderBy: z.union([SettingOrderByWithAggregationInputObjectSchema, SettingOrderByWithAggregationInputObjectSchema.array()]).optional(), having: SettingScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(SettingScalarFieldEnum), _count: z.union([ z.literal(true), SettingCountAggregateInputObjectSchema ]).optional(), _min: SettingMinAggregateInputObjectSchema.optional(), _max: SettingMaxAggregateInputObjectSchema.optional() }).strict();