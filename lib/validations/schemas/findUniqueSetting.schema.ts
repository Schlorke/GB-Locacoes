/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { SettingSelectObjectSchema as SettingSelectObjectSchema } from './objects/SettingSelect.schema'
import { SettingWhereUniqueInputObjectSchema as SettingWhereUniqueInputObjectSchema } from './objects/SettingWhereUniqueInput.schema'

export const SettingFindUniqueSchema: z.ZodType<Prisma.SettingFindUniqueArgs> =
  z
    .object({
      select: SettingSelectObjectSchema.optional(),
      where: SettingWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.SettingFindUniqueArgs>

export const SettingFindUniqueZodSchema = z
  .object({
    select: SettingSelectObjectSchema.optional(),
    where: SettingWhereUniqueInputObjectSchema,
  })
  .strict()
