import { NextResponse } from "next/server"

export async function GET() {
  try {
    const envInfo = {
      NODE_ENV: process.env.NODE_ENV || "development",

      // === DATABASE (SUPABASE) ===
      DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
      DATABASE_URL_LENGTH: process.env.DATABASE_URL?.length || 0,
      DATABASE_URL_PREVIEW: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.substring(0, 30)}...` : "Not found",

      POSTGRES_PRISMA_URL_EXISTS: !!process.env.POSTGRES_PRISMA_URL,
      DIRECT_URL_EXISTS: !!process.env.DIRECT_URL,
      DIRECT_URL_LENGTH: process.env.DIRECT_URL?.length || 0,
      DIRECT_URL_PREVIEW: process.env.DIRECT_URL ? `${process.env.DIRECT_URL.substring(0, 30)}...` : "Not found",

      // === AUTHENTICATION (NEXTAUTH) ===
      NEXTAUTH_SECRET_EXISTS: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "Not found",

      // === BLOB STORAGE (VERCEL) ===
      BLOB_READ_WRITE_TOKEN_EXISTS: !!process.env.BLOB_READ_WRITE_TOKEN,

      // === RESUMO DE INTEGRAÇÕES ===
      INTEGRATIONS_STATUS: {
        supabase: !!process.env.DATABASE_URL,
        vercel_blob: !!process.env.BLOB_READ_WRITE_TOKEN,
        nextauth: !!process.env.NEXTAUTH_SECRET && !!process.env.NEXTAUTH_URL,
      },

      // === VARIÁVEIS PRINCIPAIS PARA DEBUG ===
      MAIN_ENV_KEYS: Object.keys(process.env)
        .filter(
          (key) =>
            key.includes("DATABASE") || key.includes("DIRECT_URL") || key.includes("NEXTAUTH") || key.includes("BLOB"),
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
