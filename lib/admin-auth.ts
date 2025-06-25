import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import type { UserRole } from "@prisma/client"

export async function requireAdminAuth() {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Não autenticado")
  }

  const userRole = session.user?.role as UserRole
  if (!["ADMIN", "OPERATOR", "FINANCIAL"].includes(userRole)) {
    throw new Error("Acesso negado - privilégios insuficientes")
  }

  return session
}

export function hasAdminRole(role: string): boolean {
  return ["ADMIN", "OPERATOR", "FINANCIAL"].includes(role)
}
