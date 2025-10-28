'use client'

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

interface SocialLoginButtonsProps {
  isLoading?: boolean
  onError?: (_error: string) => void
  className?: string
  variant?: 'default' | 'compact'
  callbackUrl?: string
}

export function SocialLoginButtons({
  isLoading = false,
  onError,
  className = '',
  variant = 'default',
  callbackUrl,
}: SocialLoginButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setLoadingProvider(provider)

    try {
      // Se callbackUrl não for fornecido, deixa NextAuth decidir
      const options = callbackUrl ? { callbackUrl } : {}
      await signIn(provider, options)
    } catch (error) {
      console.error('Social login error:', error)
      onError?.(
        `Falha ao fazer login com ${provider === 'google' ? 'Google' : 'Facebook'}`
      )
    } finally {
      setLoadingProvider(null)
    }
  }

  const buttonHeight = variant === 'compact' ? 'h-10' : 'h-12'
  const iconSize = variant === 'compact' ? 'w-4 h-4' : 'w-4 h-4'
  const textSize = variant === 'compact' ? 'text-sm' : 'text-sm'

  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {/* Google Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => handleSocialLogin('google')}
        disabled={isLoading || loadingProvider === 'google'}
        className={`${buttonHeight} px-4 py-2 border-slate-300 hover:bg-slate-50 ${
          loadingProvider === 'google' ? 'opacity-75' : ''
        }`}
      >
        {loadingProvider === 'google' ? (
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></div>
            {variant !== 'compact' && (
              <span className={textSize}>Entrando...</span>
            )}
          </div>
        ) : (
          <>
            <svg className={`${iconSize} mr-2`} viewBox="0 0 24 24">
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
          </>
        )}
      </Button>

      {/* Facebook Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => handleSocialLogin('facebook')}
        disabled={isLoading || loadingProvider === 'facebook'}
        className={`${buttonHeight} px-4 py-2 border-slate-300 hover:bg-slate-50 ${
          loadingProvider === 'facebook' ? 'opacity-75' : ''
        }`}
      >
        {loadingProvider === 'facebook' ? (
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></div>
            {variant !== 'compact' && (
              <span className={textSize}>Entrando...</span>
            )}
          </div>
        ) : (
          <>
            <svg
              className={`${iconSize} mr-2`}
              fill="#1877F2"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </>
        )}
      </Button>
    </div>
  )
}

// Componente para o divisor
export function SocialDivider({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-slate-200" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white px-2 text-slate-500">{children}</span>
      </div>
    </div>
  )
}
