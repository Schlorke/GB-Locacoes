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
import { AlertTriangle, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { getSession, signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, type FormEvent, Suspense } from 'react'
import Link from 'next/link'

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
      const session = await getSession()
      if (session) {
        // Verificar se é admin baseado no email ou role
        const isAdmin = session.user?.email === 'admin@gblocacoes.com.br' || session.user?.role === 'ADMIN'
        if (isAdmin) {
          router.push('/admin/dashboard')
        } else {
          router.push('/area-cliente')
        }
      }
    }
    checkAuth()
  }, [router])

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
        if (isAdmin) {
          router.push('/admin/dashboard')
        } else {
          router.push('/area-cliente')
        }
        router.refresh()
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

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true)
    setError(null)
    
    try {
      await signIn(provider, { callbackUrl: '/area-cliente' })
    } catch (err) {
      console.error('Social login error:', err)
      setError('Falha ao fazer login com ' + provider)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 -mt-[100px] md:-mt-[96px]">
      <div className="flex min-h-screen items-center justify-center px-4 pt-[120px] md:pt-0">
        {/* Container do login centralizado */}
        <div className="w-full max-w-md relative z-10">
          <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden animate-scale-in">
            <div className="overflow-y-auto rounded-2xl max-h-[85vh]">
              <CardHeader className="text-center space-y-3 py-4 px-6 animate-fade-in-up">
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

              <CardContent className="px-6 pb-4 space-y-4">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 max-w-sm mx-auto"
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
                      placeholder="admin@gblocacoes.com.br"
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
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-500">Ou continue com</span>
                  </div>
                </div>

                {/* Botões de login social */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                    className="h-12 border-slate-300 hover:bg-slate-50"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin('facebook')}
                    disabled={isLoading}
                    className="h-12 border-slate-300 hover:bg-slate-50"
                  >
                    <svg className="w-4 h-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>

                {/* Links de navegação */}
                <div className="text-center space-y-2">
                  <div className="text-sm text-slate-600">
                    Não tem uma conta?{' '}
                    <Link href="/cadastro" className="text-slate-700 hover:text-slate-900 font-medium underline">
                      Cadastre-se
                    </Link>
                  </div>
                  <div className="text-sm text-slate-600">
                    <Link href="/recuperar-senha" className="text-slate-700 hover:text-slate-900 font-medium underline">
                      Esqueceu sua senha?
                    </Link>
                  </div>
                </div>

                {/* Seção de informações melhorada e centralizada */}
                <div className="text-center space-y-2 pt-3 border-t border-slate-200/60 max-w-sm mx-auto">
                  <div className="text-xs text-slate-500">
                    <p className="font-semibold mb-2 text-slate-600 text-sm">
                      Credenciais de acesso:
                    </p>
                    <div
                      className="font-mono text-xs bg-gradient-to-r from-slate-100 to-slate-50 px-3 py-2.5 rounded-md text-slate-700 border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow duration-200"
                      style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.06)' }}
                    >
                      <div className="font-medium">admin@gblocacoes.com.br</div>
                      <div className="font-medium mt-1">admin123</div>
                    </div>
                  </div>
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
