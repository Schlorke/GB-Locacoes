import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Schema de validação
const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  equipment: z.string().optional(),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Dados recebidos no formulário de contato:", body)

    // Validar dados
    const validatedData = contactSchema.parse(body)

    // Por enquanto, vamos simular o envio e salvar no console
    console.log("=== NOVO CONTATO RECEBIDO ===")
    console.log("Nome:", validatedData.name)
    console.log("Email:", validatedData.email)
    console.log("Telefone:", validatedData.phone)
    console.log("Equipamento:", validatedData.equipment || "Não especificado")
    console.log("Mensagem:", validatedData.message)
    console.log("Data:", new Date().toISOString())

    // TODO: Implementar envio de email real
    // TODO: Salvar no banco de dados se necessário
    // TODO: Integrar com WhatsApp Business API

    // Simular delay de processamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    })
  } catch (error) {
    console.error("Erro ao processar formulário de contato:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados inválidos",
          errors: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
