'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'

export interface HoverActionMenuProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onMouseEnter' | 'onMouseLeave'
> {
  /**
   * Conteúdo do botão (ícone, texto, etc.)
   */
  children: React.ReactNode
  /**
   * Posicionamento do menu em relação ao container pai
   * @default 'top-center'
   */
  position?:
    | 'top-center'
    | 'top-left'
    | 'top-right'
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right'
  /**
   * Offset vertical do posicionamento (em pixels ou Tailwind classes)
   * @default 'mb-2' para top, 'mt-2' para bottom
   */
  offset?: string
  /**
   * Nome do grupo Tailwind para o hover (ex: 'preview-card')
   * Se não fornecido, usa o grupo padrão 'group'
   * @default undefined (usa grupo padrão)
   */
  groupName?: string
  /**
   * Classe CSS adicional para o wrapper
   */
  wrapperClassName?: string
  /**
   * Classe CSS adicional para o botão
   */
  buttonClassName?: string
  /**
   * Handler para quando o mouse entra no wrapper do menu (div)
   */
  onMouseEnter?: (_e: React.MouseEvent<HTMLDivElement>) => void
  /**
   * Handler para quando o mouse sai do wrapper do menu (div)
   */
  onMouseLeave?: (_e: React.MouseEvent<HTMLDivElement>) => void
}

/**
 * HoverActionMenu - Componente de menu de ações acionado por hover
 *
 * Um componente reutilizável que exibe um botão de ação flutuante que aparece
 * quando o usuário passa o mouse sobre uma área específica.
 *
 * Pode ser usado de duas formas:
 * 1. Com CSS group-hover (padrão): Use `group` no container pai e opcionalmente `groupName`
 * 2. Com JavaScript: Use `onMouseEnter`/`onMouseLeave` e controle visibilidade via `buttonClassName`
 *
 * @example
 * ```tsx
 * // Uso com CSS group-hover
 * <div className="group relative">
 *   <YourContent />
 *   <HoverActionMenu
 *     onClick={handleAction}
 *     aria-label="Ação rápida"
 *     position="top-center"
 *   >
 *     <Icon />
 *     <span>Ação</span>
 *   </HoverActionMenu>
 * </div>
 *
 * // Uso com JavaScript
 * <div>
 *   <YourContent onMouseEnter={() => setIsHovered(true)} />
 *   <HoverActionMenu
 *     onClick={handleAction}
 *     buttonClassName={isHovered ? 'opacity-100' : 'opacity-0'}
 *     onMouseEnter={() => setIsHovered(true)}
 *     onMouseLeave={() => setIsHovered(false)}
 *   >
 *     <Icon />
 *     <span>Ação</span>
 *   </HoverActionMenu>
 * </div>
 * ```
 */
const HoverActionMenu = React.forwardRef<
  HTMLButtonElement,
  HoverActionMenuProps
>(
  (
    {
      children,
      position = 'top-center',
      offset,
      groupName,
      wrapperClassName,
      buttonClassName,
      className,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    // Usa grupo nomeado se fornecido, caso contrário usa grupo padrão
    const groupClass = groupName ? `group-hover/${groupName}:` : 'group-hover:'
    const positionClasses = {
      'top-center': 'left-1/2 -translate-x-1/2',
      'top-left': 'left-0',
      'top-right': 'right-0',
      'bottom-center': 'left-1/2 -translate-x-1/2',
      'bottom-left': 'left-0',
      'bottom-right': 'right-0',
    }

    // Se offset for fornecido, usa ele diretamente (ex: top-[3.5rem])
    // Caso contrário, usa bottom-full/top-full com margem padrão
    const defaultOffset = position.startsWith('top')
      ? 'bottom-full mb-2'
      : 'top-full mt-2'

    // Se offset customizado for fornecido, não aplica bottom-full/top-full
    const hasCustomOffset =
      offset &&
      (offset.includes('top-[') ||
        offset.includes('bottom-[') ||
        offset.includes('top-') ||
        offset.includes('bottom-'))
    const offsetValue = offset ?? defaultOffset
    const verticalPosition = hasCustomOffset
      ? ''
      : position.startsWith('top')
        ? 'bottom-full'
        : 'top-full'

    // Se wrapperClassName contém !relative, remove classes de posicionamento absoluto
    const isRelative = wrapperClassName?.includes('!relative')
    const wrapperClasses = isRelative
      ? cn('flex z-10', wrapperClassName)
      : cn(
          'absolute flex justify-center z-10',
          positionClasses[position],
          verticalPosition,
          offsetValue,
          wrapperClassName
        )

    return (
      <div
        className={wrapperClasses}
        // Wrapper com pointer-events-none por padrão para não interferir com hover de elementos abaixo
        // Pode ser sobrescrito via wrapperClassName
        style={
          wrapperClassName?.includes('pointer-events-auto')
            ? { pointerEvents: 'auto' }
            : { pointerEvents: 'none' }
        }
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <button
          ref={ref}
          type="button"
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-full shadow-lg transition-all duration-160 ease-in-out hover:text-orange-600 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
            // Se buttonClassName já tem opacity/translate, usa ele diretamente
            // Caso contrário, aplica estilos padrão baseados em groupName ou grupo padrão
            buttonClassName?.includes('opacity-') ||
              buttonClassName?.includes('translate-')
              ? ''
              : 'opacity-0 translate-y-1',
            // Aplica group-hover apenas se buttonClassName não sobrescrever e groupName estiver definido
            groupName &&
              !buttonClassName?.includes('opacity-') &&
              !buttonClassName?.includes('translate-')
              ? `${groupClass}opacity-100 ${groupClass}translate-y-0`
              : !buttonClassName?.includes('opacity-') &&
                  !buttonClassName?.includes('translate-')
                ? 'group-hover:opacity-100 group-hover:translate-y-0'
                : '',
            buttonClassName,
            className
          )}
          // Botão com pointer-events-auto para ser clicável mesmo com wrapper com pointer-events-none
          style={{
            pointerEvents: 'auto',
          }}
          {...props}
        >
          {children}
        </button>
      </div>
    )
  }
)

HoverActionMenu.displayName = 'HoverActionMenu'

export { HoverActionMenu }
