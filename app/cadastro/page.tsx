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
import { AlertTriangle, Eye, EyeOff } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Suspense, useState, type FormEvent } from 'react'

function CadastroForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    cpf: '',
    cnpj: '',
    cep: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 9)
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
  }

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`
    if (numbers.length <= 8)
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`
    if (numbers.length <= 12)
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`
  }

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 5) return numbers
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData((prev) => ({ ...prev, phone: formatted }))
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value)
    setFormData((prev) => ({ ...prev, cpf: formatted }))
  }

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value)
    setFormData((prev) => ({ ...prev, cnpj: formatted }))
  }

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value)
    setFormData((prev) => ({ ...prev, cep: formatted }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validações
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      setError('Por favor, preencha todos os campos obrigatórios.')
      setIsLoading(false)
      return
    }

    if (!formData.cpf && !formData.cnpj) {
      setError('Por favor, preencha o CPF ou CNPJ.')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          cpf: formData.cpf || undefined,
          cnpj: formData.cnpj || undefined,
          cep: formData.cep || undefined,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirecionar para login com mensagem de sucesso
        router.push('/login?registered=true')
      } else {
        setError(data.error || 'Erro ao criar conta')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError('Erro ao criar conta. Tente novamente.')
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 md:-mt-[96px]">
      <div className="flex min-h-screen items-center justify-center  px-4 pb-8 md:px-6 md:pt-24 md:pb-8 lg:mt-3 xl:px-4 xl:py-20">
        {/* Container do cadastro centralizado */}
        <div className="w-full pt-5 max-w-xl relative z-10">
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
                    Criar Conta
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-sm leading-relaxed">
                    Preencha os dados para criar sua conta
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="px-4 pb-8 space-y-6 md:px-8 md:pb-4 md:space-y-4 xl:px-6">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 w-full max-w-lg mx-auto"
                >
                  {error && (
                    <Alert
                      variant="destructive"
                      className="border-red-200 bg-red-50/90 backdrop-blur-sm rounded-2xl shadow-md"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle className="text-red-800 text-sm font-semibold">
                        Erro no Cadastro
                      </AlertTitle>
                      <AlertDescription className="text-red-700 text-sm leading-relaxed">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Linha 1: Nome e E-mail */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-slate-700 font-semibold text-sm block text-left"
                      >
                        Nome Completo
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Seu nome completo"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="h-12 border-slate-300 focus:border-slate-500 text-sm placeholder:text-slate-400 bg-white/90 backdrop-blur-sm transition-all duration-200 rounded-md shadow-sm hover:shadow-md focus:shadow-lg"
                        aria-label="Digite seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-slate-700 font-semibold text-sm block text-left"
                      >
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="h-12 border-slate-300 focus:border-slate-500 text-sm placeholder:text-slate-400 bg-white/90 backdrop-blur-sm transition-all duration-200 rounded-md shadow-sm hover:shadow-md focus:shadow-lg"
                        aria-label="Digite seu e-mail"
                      />
                    </div>
                  </div>

                  {/* Linha 2: Telefone e CEP */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-slate-700 font-semibold text-sm block text-left"
                      >
                        Telefone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(51) 99999-9999"
                        required
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        disabled={isLoading}
                        className="h-12 border-slate-300 focus:border-slate-500 text-sm placeholder:text-slate-400 bg-white/90 backdrop-blur-sm transition-all duration-200 rounded-md shadow-sm hover:shadow-md focus:shadow-lg"
                        maxLength={15}
                        aria-label="Digite seu telefone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="cep"
                        className="text-slate-700 font-semibold text-sm block text-left"
                      >
                        CEP
                      </Label>
                      <Input
                        id="cep"
                        name="cep"
                        type="text"
                        placeholder="00000-000"
                        value={formData.cep}
                        onChange={handleCEPChange}
                        disabled={isLoading}
                        className="h-12 border-slate-300 focus:border-slate-500 text-sm placeholder:text-slate-400 bg-white/90 backdrop-blur-sm transition-all duration-200 rounded-md shadow-sm hover:shadow-md focus:shadow-lg"
                        maxLength={9}
                        aria-label="Digite seu CEP"
                      />
                    </div>
                  </div>

                  {/* Linha 3: CPF e CNPJ */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="cpf"
                        className="text-slate-700 font-semibold text-sm block text-left"
                      >
                        CPF
                      </Label>
                      <Input
                        id="cpf"
                        name="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={handleCPFChange}
                        disabled={isLoading}
                        className="h-12 border-slate-300 focus:border-slate-500 text-sm placeholder:text-slate-400 bg-white/90 backdrop-blur-sm transition-all duration-200 rounded-md shadow-sm hover:shadow-md focus:shadow-lg"
                        maxLength={14}
                        aria-label="Digite seu CPF"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="cnpj"
                        className="text-slate-700 font-semibold text-sm block text-left"
                      >
                        CNPJ
                      </Label>
                      <Input
                        id="cnpj"
                        name="cnpj"
                        type="text"
                        placeholder="00.000.000/0000-00"
                        value={formData.cnpj}
                        onChange={handleCNPJChange}
                        disabled={isLoading}
                        className="h-12 border-slate-300 focus:border-slate-500 text-sm placeholder:text-slate-400 bg-white/90 backdrop-blur-sm transition-all duration-200 rounded-md shadow-sm hover:shadow-md focus:shadow-lg"
                        maxLength={18}
                        aria-label="Digite seu CNPJ"
                      />
                    </div>
                  </div>

                  {/* Linha 4: Senhas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Mínimo 6 caracteres"
                          required
                          value={formData.password}
                          onChange={handleInputChange}
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
                    <div className="space-y-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-slate-700 font-semibold text-sm block text-left"
                      >
                        Confirmar Senha
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirme sua senha"
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          className="h-12 border-slate-300 focus:border-slate-500 pr-12 text-sm placeholder:text-slate-400 bg-white/90 backdrop-blur-sm transition-all duration-200 rounded-md shadow-sm hover:shadow-md focus:shadow-lg"
                          aria-label="Confirme sua senha"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100 rounded-md transition-all duration-200"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          disabled={isLoading}
                          aria-label={
                            showConfirmPassword
                              ? 'Ocultar confirmação'
                              : 'Mostrar confirmação'
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-slate-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-slate-500" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-1">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none rounded-md"
                      disabled={isLoading}
                      aria-label="Criar Conta"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          <span className="text-sm">Criando conta...</span>
                        </div>
                      ) : (
                        'Criar Conta'
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
                    <span className="bg-white px-2 text-slate-500">
                      Ou continue com
                    </span>
                  </div>
                </div>

                {/* Botões de login social */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                    className="h-12 px-4 py-2 border-slate-300 hover:bg-slate-50"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin('facebook')}
                    disabled={isLoading}
                    className="h-12 px-4 py-2 border-slate-300 hover:bg-slate-50"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="#1877F2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>

                {/* Links de navegação */}
                <div className="text-center space-y-2">
                  <div className="text-sm text-slate-600">
                    Já tem uma conta?{' '}
                    <Link
                      href="/login"
                      className="text-slate-700 hover:text-slate-900 font-medium underline"
                    >
                      Faça login
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

export default function CadastroPage() {
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
      <CadastroForm />
    </Suspense>
  )
}
