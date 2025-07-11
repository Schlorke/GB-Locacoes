'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Header from '@/components/header';
import { AlertTriangle, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Measure header height to properly center the login block
  useEffect(() => {
    const measureHeader = () => {
      const headerEl = document.querySelector('header');
      if (headerEl) {
        const height = headerEl.getBoundingClientRect().height;
        setHeaderHeight(height);
      }
    };

    // Measure on mount
    measureHeader();
    // Measure on resize
    window.addEventListener('resize', measureHeader);
    // Measure after a short delay to ensure header is fully rendered
    const timer = setTimeout(measureHeader, 100);

    return () => {
      window.removeEventListener('resize', measureHeader);
      clearTimeout(timer);
    };
  }, []);

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (session) {
        router.push('/admin/dashboard');
      }
    };
    checkAuth();
  }, [router]);

  // Handle URL error parameters
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      switch (errorParam) {
        case 'CredentialsSignin':
          setError('Credenciais inválidas. Verifique seu email e senha.');
          break;
        case 'unauthorized':
          setError('Usuário não autorizado para acessar o painel administrativo.');
          break;
        default:
          setError('Erro ao fazer login. Tente novamente.');
      }
    }
  }, [searchParams]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Credenciais inválidas ou usuário não autorizado.');
      } else if (result?.ok) {
        // Successful login, redirect to dashboard
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError('Ocorreu um erro desconhecido. Tente novamente.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Falha ao tentar fazer login. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 overflow-hidden">
      <Header />
      <div
        className="flex items-center justify-center px-4 relative"
        style={{
          height: `calc(100vh - ${headerHeight || 80}px)`,
          marginTop: `${headerHeight || 80}px`,
        }}
      >
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-1000"></div>
        </div>

        {/* Container do login centralizado */}
        <div className="w-full max-w-md relative z-10">
          <Card
            className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden animate-scale-in"
            style={{
              maxHeight: `calc(100vh - ${(headerHeight || 80) + 80}px)`,
            }}
          >
            <div
              className="overflow-y-auto rounded-2xl"
              style={{
                maxHeight: `calc(100vh - ${(headerHeight || 80) + 80}px)`,
              }}
            >
              <CardHeader className="text-center space-y-4 py-6 px-6 animate-fade-in-up">
                {/* Logo melhorado com animação */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white shadow-xl ring-4 ring-slate-200/30 animate-scale-in relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60"></div>
                  <span className="text-2xl font-bold tracking-tight relative z-10">GB</span>
                </div>
                {/* Título e descrição centralizados */}
                <div className="space-y-2 max-w-sm mx-auto">
                  <CardTitle className="text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                    Painel Administrativo
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-sm leading-relaxed">
                    Acesse com suas credenciais de administrador
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto">
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
                      className="h-12 border-slate-300 focus:border-slate-500 focus-visible:ring-slate-500 text-sm placeholder:text-slate-400 bg-white/90 backdrop-blur-sm transition-all duration-200 rounded-2xl shadow-sm hover:shadow-md focus:shadow-lg"
                      aria-label="Digite seu e-mail de administrador"
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
                        className="h-12 border-slate-300 focus:border-slate-500 focus-visible:ring-slate-500 pr-12 text-sm placeholder:text-slate-400 bg-white/90 backdrop-blur-sm transition-all duration-200 rounded-2xl shadow-sm hover:shadow-md focus:shadow-lg"
                        aria-label="Digite sua senha de administrador"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100 rounded-2xl transition-all duration-200"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
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
                      className="w-full h-12 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 transform hover:scale-[1.02] disabled:transform-none rounded-2xl"
                      disabled={isLoading}
                      aria-label="Entrar no Painel Administrativo"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          <span className="text-sm">Entrando...</span>
                        </div>
                      ) : (
                        'Entrar no Painel'
                      )}
                    </Button>
                  </div>
                </form>

                {/* Seção de informações melhorada e centralizada */}
                <div className="text-center space-y-3 pt-4 border-t border-slate-200/60 max-w-sm mx-auto">
                  <div className="text-xs text-slate-500">
                    <p className="font-semibold mb-2 text-slate-600 text-sm">
                      Credenciais padrão para teste:
                    </p>
                    <div className="font-mono text-xs bg-gradient-to-r from-slate-100 to-slate-50 px-3 py-2.5 rounded-2xl text-slate-700 border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="font-medium">admin@gblocacoes.com.br</div>
                      <div className="font-medium mt-1">admin123</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 pt-2 leading-relaxed">
                    © 2024 GB Locações - Sistema Administrativo
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
