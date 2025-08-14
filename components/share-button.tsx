'use client'

import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { useState } from 'react'

interface ShareButtonProps {
  title: string
  text: string
  className?: string
}

export function ShareButton({ title, text, className }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [feedbackText, setFeedbackText] = useState('Compartilhar')

  const handleShare = async (): Promise<void> => {
    if (isSharing) return

    setIsSharing(true)

    const shareData = {
      title: title,
      text: text,
      url: window.location.href,
    }

    try {
      // Tenta usar a Web Share API (principalmente mobile)
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData)
      } else {
        // Fallback: copia o link para a área de transferência
        await navigator.clipboard.writeText(window.location.href)

        // Mostra feedback visual
        setFeedbackText('Link copiado!')

        setTimeout(() => {
          setFeedbackText('Compartilhar')
        }, 2000)
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error)

      // Fallback final: mostra o link em um alert
      alert('Link para compartilhar: ' + window.location.href)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`text-gray-500 hover:text-orange-600 transition-colors duration-200 ${
        feedbackText === 'Link copiado!' ? 'text-green-600' : ''
      } ${className}`}
      onClick={handleShare}
      disabled={isSharing}
    >
      <Share2 className="h-4 w-4 mr-1" />
      <span className="text-xs">{feedbackText}</span>
    </Button>
  )
}
