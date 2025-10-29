'use client'

import { toast as sonnerToast } from 'sonner'
import type { ExternalToast } from 'sonner'

/**
 * Hook simplificado para usar Sonner com API personalizada
 * Mantém compatibilidade com a especificação do projeto
 */
export function useToastSonner() {
  // Success toast
  const success = (
    title: string,
    description?: string,
    options?: ExternalToast
  ) => {
    return sonnerToast.success(title, {
      description,
      ...options,
    })
  }

  // Error toast
  const error = (
    title: string,
    description?: string,
    options?: ExternalToast
  ) => {
    return sonnerToast.error(title, {
      description,
      ...options,
    })
  }

  // Warning toast
  const warning = (
    title: string,
    description?: string,
    options?: ExternalToast
  ) => {
    return sonnerToast.warning(title, {
      description,
      ...options,
    })
  }

  // Info toast
  const info = (
    title: string,
    description?: string,
    options?: ExternalToast
  ) => {
    return sonnerToast.info(title, {
      description,
      ...options,
    })
  }

  // Default toast - aceita string ou objeto
  const toast = (
    titleOrOptions:
      | string
      | { title: string; description?: string; showIcon?: boolean },
    description?: string,
    options?: ExternalToast
  ) => {
    if (typeof titleOrOptions === 'string') {
      return sonnerToast(titleOrOptions, {
        description,
        ...options,
      })
    } else {
      return sonnerToast(titleOrOptions.title, {
        description: titleOrOptions.description,
        ...options,
      })
    }
  }

  // Dismiss specific toast or all
  const dismiss = (toastId?: string | number) => {
    if (toastId) {
      sonnerToast.dismiss(toastId)
    } else {
      sonnerToast.dismiss()
    }
  }

  return {
    success,
    error,
    warning,
    info,
    toast,
    dismiss,
  }
}

// Exportar também as funções diretas para uso sem hook
export const success = (
  title: string,
  description?: string,
  options?: ExternalToast
) => {
  return sonnerToast.success(title, {
    description,
    ...options,
  })
}

export const error = (
  title: string,
  description?: string,
  options?: ExternalToast
) => {
  return sonnerToast.error(title, {
    description,
    ...options,
  })
}

export const warning = (
  title: string,
  description?: string,
  options?: ExternalToast
) => {
  return sonnerToast.warning(title, {
    description,
    ...options,
  })
}

export const info = (
  title: string,
  description?: string,
  options?: ExternalToast
) => {
  return sonnerToast.info(title, {
    description,
    ...options,
  })
}

export const toast = (
  titleOrOptions:
    | string
    | { title: string; description?: string; showIcon?: boolean },
  description?: string,
  options?: ExternalToast
) => {
  if (typeof titleOrOptions === 'string') {
    return sonnerToast(titleOrOptions, {
      description,
      ...options,
    })
  } else {
    return sonnerToast(titleOrOptions.title, {
      description: titleOrOptions.description,
      ...options,
    })
  }
}
