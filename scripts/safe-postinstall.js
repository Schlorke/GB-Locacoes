#!/usr/bin/env node
/**
 * Safe postinstall script that doesn't fail the build if Prisma generate fails.
 * This is important for Vercel builds where DATABASE_URL might not be available
 * during the install phase. The prebuild script will handle Prisma generate.
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV
const isCI = process.env.CI === 'true' || isVercel
const hasDatabaseUrl = !!process.env.DATABASE_URL

// Only run Prisma generate in development or if DATABASE_URL is available
const shouldRunPrismaGenerate = !isCI || hasDatabaseUrl

try {
  // Check if Prisma schema exists
  const schemaPath = join(process.cwd(), 'prisma', 'schema.prisma')
  if (!existsSync(schemaPath)) {
    console.log('[postinstall] ⏭️  Prisma schema not found, skipping')
    process.exit(0)
  }

  // In CI/Vercel, skip if DATABASE_URL is not available
  if (isCI && !hasDatabaseUrl) {
    console.log(
      '[postinstall] ⏭️  Skipping Prisma generate in CI (DATABASE_URL not available)'
    )
    console.log('[postinstall] ℹ️  Prisma will be generated during prebuild')
    process.exit(0)
  }

  // Try to generate Prisma client
  console.log('[postinstall] 🔄 Generating Prisma client...')
  execSync('prisma generate', {
    stdio: 'inherit',
    cwd: process.cwd(),
  })

  // Run post-prisma-generate script
  const postPrismaScript = join(
    process.cwd(),
    'scripts',
    'post-prisma-generate.js'
  )
  if (existsSync(postPrismaScript)) {
    console.log('[postinstall] 🔄 Running post-prisma-generate script...')
    execSync(`node ${postPrismaScript}`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    })
  }

  console.log('[postinstall] ✅ Prisma client generated successfully')
  process.exit(0)
} catch (error) {
  // Don't fail the build if Prisma generate fails
  // The prebuild script will handle it
  console.warn('[postinstall] ⚠️  Prisma generate failed, but continuing...')
  console.warn(
    '[postinstall] ℹ️  This is OK - Prisma will be generated during prebuild'
  )
  if (!isCI) {
    console.error('[postinstall] Error details:', error.message)
  }
  process.exit(0) // Exit with success to not break the install
}
