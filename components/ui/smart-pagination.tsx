'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

interface SmartPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (_page: number) => void
  className?: string
  showPageNumbers?: number
}

export function SmartPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showPageNumbers = 5,
}: SmartPaginationProps) {
  // Se só tem 1 página, não mostra paginação
  if (totalPages <= 1) return null

  // Calcular quais páginas mostrar
  const getVisiblePages = () => {
    const pages: number[] = []
    const half = Math.floor(showPageNumbers / 2)

    let start = Math.max(1, currentPage - half)
    const end = Math.min(totalPages, start + showPageNumbers - 1)

    // Ajustar o início se o fim ficou menor que o desejado
    if (end - start + 1 < showPageNumbers) {
      start = Math.max(1, end - showPageNumbers + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  const visiblePages = getVisiblePages()
  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < totalPages

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      {/* Info da página atual - posicionada em cima */}
      <div className="flex items-center justify-center text-sm text-gray-600">
        Página {currentPage} de {totalPages}
      </div>

      <Pagination className="py-2">
        <PaginationContent>
          {/* Botão Anterior */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => canGoPrev && onPageChange(currentPage - 1)}
              className={cn(
                'cursor-pointer select-none hover:!bg-white hover:!border-gray-300 hover:!text-current',
                !canGoPrev && 'pointer-events-none opacity-50'
              )}
            />
          </PaginationItem>

          {/* Primeira página se não estiver visível */}
          {visiblePages.length > 0 && (visiblePages[0] ?? 0) > 1 && (
            <>
              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange(1)}
                  isActive={1 === currentPage}
                  className={cn(
                    'cursor-pointer select-none hover:!bg-white hover:!border hover:!border-gray-300 hover:!text-current',
                    1 === currentPage &&
                      'bg-orange-600 hover:bg-orange-700 text-white border-orange-600'
                  )}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {visiblePages.length > 0 && (visiblePages[0] ?? 0) > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {/* Páginas visíveis */}
          {visiblePages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={page === currentPage}
                className={cn(
                  'cursor-pointer select-none hover:!bg-white hover:!border hover:!border-gray-300 hover:!text-current',
                  page === currentPage &&
                    'bg-orange-600 hover:bg-orange-700 text-white border-orange-600'
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Última página se não estiver visível */}
          {visiblePages.length > 0 &&
            (visiblePages[visiblePages.length - 1] ?? 0) < totalPages && (
              <>
                {visiblePages.length > 0 &&
                  (visiblePages[visiblePages.length - 1] ?? 0) <
                    totalPages - 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                <PaginationItem>
                  <PaginationLink
                    onClick={() => onPageChange(totalPages)}
                    isActive={totalPages === currentPage}
                    className={cn(
                      'cursor-pointer select-none hover:!bg-white hover:!border hover:!border-gray-300 hover:!text-current',
                      totalPages === currentPage &&
                        'bg-orange-600 hover:bg-orange-700 text-white border-orange-600'
                    )}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

          {/* Botão Próximo */}
          <PaginationItem>
            <PaginationNext
              onClick={() => canGoNext && onPageChange(currentPage + 1)}
              className={cn(
                'cursor-pointer select-none hover:!bg-white hover:!border-gray-300 hover:!text-current',
                !canGoNext && 'pointer-events-none opacity-50'
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
