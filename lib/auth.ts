import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔐 [AUTH] Iniciando processo de autenticação")
        console.log("🔐 [AUTH] Credenciais recebidas:", {
          email: credentials?.email,
          hasPassword: !!credentials?.password,
        })

        if (!credentials?.email || !credentials.password) {
          console.log("❌ [AUTH] Credenciais inválidas - email ou senha ausentes")
          throw new Error("Email e senha são obrigatórios")
        }

        try {
          console.log("🔍 [AUTH] Buscando usuário no banco de dados...")

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          console.log("🔍 [AUTH] Resultado da busca:", {
            userFound: !!user,
            userId: user?.id,
            userEmail: user?.email,
            userRole: user?.role,
            hasPassword: !!user?.password,
          })

          if (!user || !user.password) {
            console.log("❌ [AUTH] Usuário não encontrado ou sem senha")
            throw new Error("Usuário não encontrado")
          }

          console.log("🔑 [AUTH] Comparando senhas...")
          const isValidPassword = await bcrypt.compare(credentials.password, user.password)
          console.log("🔑 [AUTH] Resultado da comparação de senha:", isValidPassword)

          if (!isValidPassword) {
            console.log("❌ [AUTH] Senha inválida")
            throw new Error("Senha inválida")
          }

          console.log("👤 [AUTH] Verificando role do usuário:", user.role)

          // Only allow ADMIN, OPERATOR, FINANCIAL roles to access admin panel
          if (user.role === UserRole.CUSTOMER) {
            console.log("❌ [AUTH] Usuário com role CUSTOMER tentando acessar admin")
            throw new Error("Usuário não autorizado para acessar o painel administrativo")
          }

          console.log("📝 [AUTH] Atualizando último login...")
          // Update last login
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
          })

          console.log("✅ [AUTH] Autenticação bem-sucedida!")
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("💥 [AUTH] Erro durante autenticação:", error)
          throw error
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
      }
      return session
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Ativar debug do NextAuth
}

export default NextAuth(authOptions)
