import { NextResponse } from "next/server"

export async function GET() {
  try {
    const envInfo = {
      NODE_ENV: process.env.NODE_ENV || "development",

      // === DATABASE (NEON) ===
      DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
      DATABASE_URL_LENGTH: process.env.DATABASE_URL?.length || 0,
      DATABASE_URL_PREVIEW: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.substring(0, 30)}...` : "Not found",

      POSTGRES_PRISMA_URL_EXISTS: !!process.env.POSTGRES_PRISMA_URL,
      DIRECT_URL_EXISTS: !!process.env.DIRECT_URL,
      DIRECT_URL_LENGTH: process.env.DIRECT_URL?.length || 0,
      DIRECT_URL_PREVIEW: process.env.DIRECT_URL ? `${process.env.DIRECT_URL.substring(0, 30)}...` : "Not found",
      NEON_PROJECT_ID: process.env.NEON_PROJECT_ID || "Not found",

      // === REDIS/KV (UPSTASH) ===
      KV_REST_API_URL_EXISTS: !!process.env.KV_REST_API_URL,
      KV_REST_API_URL: process.env.KV_REST_API_URL || "Not found",
      KV_REST_API_TOKEN_EXISTS: !!process.env.KV_REST_API_TOKEN,
      KV_REST_API_READ_ONLY_TOKEN_EXISTS: !!process.env.KV_REST_API_READ_ONLY_TOKEN,
      UPSTASH_REDIS_REST_TOKEN_EXISTS: !!process.env.UPSTASH_REDIS_REST_TOKEN,
      KV_URL_EXISTS: !!process.env.KV_URL,
      REDIS_URL_EXISTS: !!process.env.REDIS_URL,

      // === AUTHENTICATION (NEXTAUTH) ===
      NEXTAUTH_SECRET_EXISTS: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "Not found",

      // === BLOB STORAGE (VERCEL) ===
      BLOB_READ_WRITE_TOKEN_EXISTS: !!process.env.BLOB_READ_WRITE_TOKEN,

      // === STACK AUTH (OPCIONAL) ===
      STACK_SECRET_SERVER_KEY_EXISTS: !!process.env.STACK_SECRET_SERVER_KEY,
      NEXT_PUBLIC_STACK_PROJECT_ID: process.env.NEXT_PUBLIC_STACK_PROJECT_ID || "Not found",

      // === RESUMO DE INTEGRAÇÕES ===
      INTEGRATIONS_STATUS: {
        neon: !!process.env.DATABASE_URL,
        upstash: !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN,
        vercel_blob: !!process.env.BLOB_READ_WRITE_TOKEN,
        nextauth: !!process.env.NEXTAUTH_SECRET && !!process.env.NEXTAUTH_URL,
        stack_auth: !!process.env.STACK_SECRET_SERVER_KEY,
      },

      // === VARIÁVEIS PRINCIPAIS PARA DEBUG ===
      MAIN_ENV_KEYS: Object.keys(process.env)
        .filter(
          (key) =>
            key.includes("DATABASE") ||
            key.includes("KV_") ||
            key.includes("NEXTAUTH") ||
            key.includes("BLOB") ||
            key.includes("STACK") ||
            key.includes("NEON") ||
            key.includes("UPSTASH"),
        )
        .sort(),
    }

    return NextResponse.json({
      status: "success",
      message: "Environment variables checked successfully",
      data: envInfo,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
