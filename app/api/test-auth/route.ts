import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("🧪 [TEST-AUTH] Testando autenticação direta")
    console.log("📧 Email:", email)

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "Usuário não encontrado",
      })
    }

    const isValid = await bcrypt.compare(password, user.password || "")

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        hasPassword: !!user.password,
        passwordValid: isValid,
      },
    })
  } catch (error) {
    console.error("Erro no teste de auth:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    })
  }
}
