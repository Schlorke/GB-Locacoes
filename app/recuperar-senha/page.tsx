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
import { AlertTriangle, ArrowLeft, CheckCircle, Mail } from 'lucide-react'
import Link from 'next/link'
import { useState, type FormEvent } from 'react'

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!email) {
      setError('Por favor, digite seu email.')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
      } else {
        setError(data.error || 'Erro ao enviar email de recuperação')
      }
    } catch (err) {
      console.error('Forgot password error:', err)
      setError('Erro ao enviar email de recuperação. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 -mt-[100px] md:-mt-[96px]">
        <div className="flex min-h-screen items-center justify-center px-4 pt-[120px] md:pt-0">
          <div className="w-full max-w-md relative z-10">
            <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="text-center space-y-3 py-6 px-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white shadow-xl">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-slate-800 tracking-tight">
                    Email Enviado!
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-sm">
                    Verifique sua caixa de entrada e siga as instruções para
                    redefinir sua senha.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-6 space-y-4">
                <div className="text-center space-y-4">
                  <p className="text-sm text-slate-600">
                    Enviamos um link de recuperação para{' '}
                    <strong>{email}</strong>
                  </p>
                  <p className="text-xs text-slate-500">
                    O link expira em 1 hora. Se você não receber o email,
                    verifique sua pasta de spam.
                  </p>

                  <div className="pt-4 space-y-3">
                    <Button
                      onClick={() => {
                        setIsSuccess(false)
                        setEmail('')
                      }}
                      variant="outline"
                      className="w-full h-12 border-slate-300 hover:bg-slate-50"
                    >
                      Enviar Novamente
                    </Button>

                    <Link href="/login">
                      <Button
                        variant="ghost"
                        className="w-full h-12 text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar ao Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 -mt-[100px] md:-mt-[96px]">
      <div className="flex min-h-screen items-center justify-center px-4 pt-[120px] md:pt-0">
        <div className="w-full max-w-md relative z-10">
          <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
            <CardHeader className="text-center space-y-3 py-6 px-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60"></div>
                <span className="text-2xl font-bold tracking-tight relative z-10">
                  GB
                </span>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold text-slate-800 tracking-tight">
                  Recuperar Senha
                </CardTitle>
                <CardDescription className="text-slate-600 text-sm">
                  Digite seu email para receber instruções de recuperação
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-6 space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert
                    variant="destructive"
                    className="border-red-200 bg-red-50/90"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="text-red-800 text-sm font-semibold">
                      Erro
                    </AlertTitle>
                    <AlertDescription className="text-red-700 text-sm">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-slate-700 font-semibold text-sm"
                  >
                    E-mail
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="h-12 pl-10 border-slate-300 focus:border-orange-500 text-sm placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    'Enviar Instruções'
                  )}
                </Button>
              </form>

              <div className="text-center pt-4">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar ao Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
