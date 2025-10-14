'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  SocialDivider,
  SocialLoginButtons,
} from '@/components/ui/social-login-buttons'
import { AlertTriangle, Eye, EyeOff } from 'lucide-react'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState, type FormEvent } from 'react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getSession()
        if (session?.user) {
          // Verificar se é admin baseado no email ou role
          const isAdmin =
            session.user?.email === 'admin@gblocacoes.com.br' ||
            session.user?.role === 'ADMIN'

          // Usar replace em vez de push para evitar histórico de navegação
          if (isAdmin) {
            router.replace('/admin/dashboard')
          } else {
            router.replace('/area-cliente')
          }
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error)
        // Em caso de erro, não redirecionar
      }
    }

    // Só verificar se não estiver carregando
    if (!isLoading) {
      checkAuth()
    }
  }, [router, isLoading])

  // Handle URL error parameters
  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam) {
      switch (errorParam) {
        case 'CredentialsSignin':
          setError('Credenciais inválidas. Verifique seu email e senha.')
          break
        case 'unauthorized':
          setError('Usuário não autorizado para acessar o sistema.')
          break
        default:
          setError('Erro ao fazer login. Tente novamente.')
      }
    }
  }, [searchParams])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.')
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError('Credenciais inválidas. Verifique seu email e senha.')
      } else if (result?.ok) {
        // Verificar se é admin baseado no email
        const isAdmin = email === 'admin@gblocacoes.com.br'

        // Usar replace em vez de push para evitar histórico de navegação
        if (isAdmin) {
          router.replace('/admin/dashboard')
        } else {
          router.replace('/area-cliente')
        }

        // Não chamar router.refresh() aqui para evitar conflitos
      } else {
        setError('Ocorreu um erro desconhecido. Tente novamente.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Falha ao tentar fazer login. Verifique sua conexão.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialError = (error: string) => {
    setError(error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 md:-mt-[96px]">
      <div className="flex min-h-screen items-center justify-center px-4 pb-8 md:px-6 md:pt-24 md:pb-8 xl:px-4 xl:py-20">
        {/* Container do login centralizado */}
        <div className="w-full pt-5 max-w-md relative z-10">
          <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden animate-scale-in">
            <div className="overflow-y-auto rounded-2xl max-h-auto">
              <CardHeader className="text-center space-y-4 py-3 pt-8 px-4 md:px-8 md:py-8 md:space-y-3 xl:px-6 animate-fade-in-up">
                {/* Logo melhorado com animação */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white shadow-xl animate-scale-in relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60"></div>
                  <span className="text-2xl font-bold tracking-tight relative z-10">
                    GB
                  </span>
                </div>
                {/* Título e descrição centralizados */}
                <div className="space-y-2 max-w-sm mx-auto">
                  <CardTitle className="text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                    Entrar
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-sm leading-relaxed">
                    Faça login com suas credenciais ou redes sociais
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="px-4 pb-8 space-y-6 md:px-8 md:pb-4 md:space-y-4 xl:px-6">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 w-full max-w-sm mx-auto md:max-w-sm"
                >
                  {error && (
                    <Alert
                      variant="destructive"
                      className="border-red-200 bg-red-50/90 backdrop-blur-sm rounded-2xl shadow-md"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle className="text-red-800 text-sm font-semibold">
                        Erro de Login
                      </AlertTitle>
                      <AlertDescription className="text-red-700 text-sm leading-relaxed">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-slate-700 font-semibold text-sm block text-left"
                    >
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contato@locacoesgb.com.br"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="h-12 border-slate-300 focus:border-slate-500 text-sm placeholder:text-slate-400 bg-white/90 backdrop-blur-sm transition-all duration-200 rounded-md shadow-sm hover:shadow-md focus:shadow-lg"
                      aria-label="Digite seu e-mail"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-slate-700 font-semibold text-sm block text-left"
                    >
                      Senha
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua senha"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="h-12 border-slate-300 focus:border-slate-500 pr-12 text-sm placeholder:text-slate-400 bg-white/90 backdrop-blur-sm transition-all duration-200 rounded-md shadow-sm hover:shadow-md focus:shadow-lg"
                        aria-label="Digite sua senha"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100 rounded-md transition-all duration-200"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        aria-label={
                          showPassword ? 'Ocultar senha' : 'Mostrar senha'
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-500" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="pt-1">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none rounded-md"
                      disabled={isLoading}
                      aria-label="Entrar no Sistema"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          <span className="text-sm">Entrando...</span>
                        </div>
                      ) : (
                        'Entrar no Sistema'
                      )}
                    </Button>
                  </div>
                </form>

                {/* Divisor */}
                <SocialDivider>Ou continue com</SocialDivider>

                {/* Botões de login social */}
                <SocialLoginButtons
                  isLoading={isLoading}
                  onError={handleSocialError}
                />

                {/* Links de navegação */}
                <div className="text-center space-y-2">
                  <div className="text-sm text-slate-600">
                    Não tem uma conta?{' '}
                    <Link
                      href="/cadastro"
                      className="text-slate-700 hover:text-slate-900 font-medium underline"
                    >
                      Cadastre-se
                    </Link>
                  </div>
                  <div className="text-sm text-slate-600">
                    <Link
                      href="/recuperar-senha"
                      className="text-slate-700 hover:text-slate-900 font-medium underline"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </div>
                </div>

                {/* Seção de informações */}
                <div className="text-center space-y-2 pt-3 border-t border-slate-200/60 max-w-sm mx-auto">
                  <p className="text-xs text-slate-400 pt-2 leading-relaxed">
                    © 2024 GB Locações - Sistema de Acesso
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
