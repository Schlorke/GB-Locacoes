import NextAuth, { type NextAuthOptions, type RequestInternal } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { Role } from "@prisma/client"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: { email?: string; password?: string } | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ) {
        console.log("🔐 [AUTH] Iniciando autenticação")

        if (!credentials?.email || !credentials.password) {
          console.log("❌ [AUTH] Credenciais ausentes")
          return null
        }

        try {
          console.log("🔍 [AUTH] Buscando usuário:", credentials.email)

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user) {
            console.log("❌ [AUTH] Usuário não encontrado")
            return null
          }

          console.log("👤 [AUTH] Usuário encontrado:", {
            id: user.id,
            email: user.email,
            role: user.role,
            hasPassword: !!user.password,
          })

          if (!user.password) {
            console.log("❌ [AUTH] Usuário sem senha")
            return null
          }

          const isValidPassword = await bcrypt.compare(credentials.password, user.password)
          console.log("🔑 [AUTH] Senha válida:", isValidPassword)

          if (!isValidPassword) {
            return null
          }


          console.log("✅ [AUTH] Autenticação bem-sucedida")

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("💥 [AUTH] Erro:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
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
        session.user.role = token.role as Role
      }
      return session
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
}

export default NextAuth(authOptions)
