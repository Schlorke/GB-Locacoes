'use client'

import { AdminFilterCard } from '@/components/admin/admin-filter-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { HybridTooltip } from '@/components/ui/HybridTooltip'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SmartPagination } from '@/components/ui/smart-pagination'
import { useIsMobile } from '@/hooks/use-mobile'
import { AnimatePresence, motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Edit,
  Eye,
  FileText,
  Info,
  Loader2,
  Package,
  Plus,
  Tag,
  Trash2,
  X,
  XCircle,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Equipment {
  id: string
  name: string
  description?: string
  pricePerDay: number
  isAvailable: boolean
  category?: {
    id: string
    name: string
    bgColor?: string
    fontColor?: string
    icon?: keyof typeof LucideIcons
    iconColor?: string
  }
  images: string[]
  createdAt: string
}

interface Category {
  id: string
  name: string
  bgColor?: string
  fontColor?: string
  icon?: keyof typeof LucideIcons
  iconColor?: string
}

export default function AdminEquipmentsPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all')
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  )
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageZoomed, setIsImageZoomed] = useState(false)

  // Estados de paginação
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(9) // 3 linhas × 3 colunas
  const [pageKey, setPageKey] = useState(0) // Key para forçar re-render com animação

  const isMobile = useIsMobile()

  // Função para renderizar ícones
  const renderIcon = (iconName?: keyof typeof LucideIcons, color?: string) => {
    if (!iconName || !LucideIcons[iconName]) return null

    const IconComponent = LucideIcons[iconName] as React.ComponentType<{
      size?: number
      color?: string
      className?: string
    }>
    return (
      <IconComponent
        size={12}
        color={color || '#3b82f6'}
        className="flex-shrink-0"
      />
    )
  }

  const fetchEquipments = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/equipments?limit=1000')
      if (response.ok) {
        const data = await response.json()
        const equipmentsData = Array.isArray(data) ? data : data.equipments
        setEquipments(equipmentsData)
      } else {
        toast.error('Erro', { description: 'Erro ao carregar equipamentos.' })
      }
    } catch (error) {
      console.error('Error fetching equipments:', error)
      toast.error('Erro', { description: 'Erro ao carregar equipamentos.' })
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }, [])

  const filterEquipments = useCallback(() => {
    const filtered = equipments.filter((equipment) => {
      const matchesSearch =
        equipment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.description?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === 'all' ||
        equipment.category?.id === selectedCategory

      const matchesAvailability =
        availabilityFilter === 'all' ||
        (availabilityFilter === 'available' && equipment.isAvailable) ||
        (availabilityFilter === 'unavailable' && !equipment.isAvailable)

      return matchesSearch && matchesCategory && matchesAvailability
    })

    setFilteredEquipments(filtered)
    // Reset para primeira página quando filtros mudam
    setCurrentPage(1)
  }, [equipments, searchTerm, selectedCategory, availabilityFilter])

  // Cálculo da paginação
  const totalPages = Math.ceil(filteredEquipments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEquipments = filteredEquipments.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setPageKey((prev) => prev + 1) // Incrementa para forçar re-render com animação
    // Delay no scroll para permitir que a animação de saída termine
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  useEffect(() => {
    fetchEquipments()
    fetchCategories()
  }, [fetchEquipments, fetchCategories])

  useEffect(() => {
    filterEquipments()
  }, [filterEquipments])

  // Fechar botões ao clicar fora em mobile
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobile && activeCardId) {
        setActiveCardId(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobile, activeCardId])

  const deleteEquipment = async (equipmentId: string) => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/equipments/${equipmentId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        toast.success('Equipamento Excluído!', {
          description: 'Equipamento excluído com sucesso.',
        })
        fetchEquipments()
      } else {
        const errorData = await response.json()
        toast.error('Erro', {
          description: errorData.error || 'Erro ao excluir equipamento.',
        })
      }
    } catch (error) {
      console.error('Error deleting equipment:', error)
      toast.error('Erro', { description: 'Erro ao excluir equipamento.' })
    } finally {
      setIsDeleting(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  // Funções do carrossel
  const nextImage = useCallback(() => {
    if (selectedEquipment?.images) {
      setCurrentImageIndex((prev) =>
        prev === selectedEquipment.images.length - 1 ? 0 : prev + 1
      )
    }
  }, [selectedEquipment?.images])

  const prevImage = useCallback(() => {
    if (selectedEquipment?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedEquipment.images.length - 1 : prev - 1
      )
    }
  }, [selectedEquipment?.images])

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index)
  }, [])

  // Reset do carrossel quando equipamento muda
  useEffect(() => {
    if (selectedEquipment) {
      setCurrentImageIndex(0)
      setIsImageZoomed(false)
    }
  }, [selectedEquipment])

  // Navegação por teclado no carrossel
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedEquipment?.images || selectedEquipment.images.length <= 1)
        return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevImage()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextImage()
      } else if (e.key === 'Escape') {
        setIsImageZoomed(false)
      }
    }

    if (selectedEquipment) {
      document.addEventListener('keydown', handleKeyPress)
      return () => document.removeEventListener('keydown', handleKeyPress)
    }

    // Retorno explícito para quando selectedEquipment é null/undefined
    return undefined
  }, [selectedEquipment, nextImage, prevImage])

  if (loading && equipments.length === 0) {
    return (
      <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-3 sm:p-4 lg:p-6 xl:p-8 pb-24 md:pb-12 max-w-none xl:max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 lg:mb-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
            {/* Clean depth layers without decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

            {/* Content */}
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                Gerenciar Equipamentos
              </h1>
              <p className="text-orange-50 mb-4 font-medium">
                Controle todo o catálogo de equipamentos para locação
              </p>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
                <Package className="w-5 h-5 text-orange-50" />
                <span className="font-semibold text-white">
                  {Array.isArray(filteredEquipments)
                    ? filteredEquipments.length
                    : 0}{' '}
                  equipamentos encontrados
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filtros e Ações */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <AdminFilterCard
            searchPlaceholder="Buscar equipamentos..."
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            filters={[
              {
                label: 'Categoria',
                value: selectedCategory,
                onValueChange: setSelectedCategory,
                placeholder: 'Categoria',
                options: [
                  { value: 'all', label: 'Todas as categorias' },
                  ...categories
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((category) => ({
                      value: category.id,
                      label: category.name,
                    })),
                ],
              },
              {
                label: 'Status',
                value: availabilityFilter,
                onValueChange: setAvailabilityFilter,
                placeholder: 'Status',
                options: [
                  { value: 'all', label: 'Todos os status' },
                  { value: 'available', label: 'Disponível' },
                  { value: 'unavailable', label: 'Indisponível' },
                ],
              },
            ]}
            actionButtons={
              <Button asChild variant="default">
                <Link href="/admin/equipamentos/novo">
                  <Plus className="w-4 h-4 mr-2 group-hover:text-orange-500 transition-colors duration-200" />
                  <span className="group-hover:text-orange-500 transition-colors duration-200">
                    Novo Equipamento
                  </span>
                </Link>
              </Button>
            }
          />
        </motion.div>

        {/* Grid de Equipamentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {loading && equipments.length > 0 && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Atualizando equipamentos...</span>
            </div>
          )}

          {!loading &&
          filteredEquipments.length === 0 &&
          equipments.length === 0 ? (
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <CardContent className="relative z-10 flex flex-col items-center justify-center py-16">
                <div className="bg-gray-100 rounded-full p-4 mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum equipamento cadastrado
                </h3>
                <p className="text-gray-500 mb-6 text-center">
                  Comece adicionando o primeiro equipamento ao catálogo
                </p>
                <Button asChild variant="default">
                  <Link href="/admin/equipamentos/novo">
                    <Plus className="w-4 h-4 mr-2 group-hover:text-orange-500 transition-colors duration-200" />
                    <span className="group-hover:text-orange-500 transition-colors duration-200">
                      Adicionar Equipamento
                    </span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : !loading && filteredEquipments.length === 0 ? (
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <CardContent className="relative z-10 flex flex-col items-center justify-center py-16">
                <div className="bg-orange-100 rounded-full p-4 mb-4">
                  <AlertCircle className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum equipamento encontrado
                </h3>
                <p className="text-gray-500 text-center">
                  Tente ajustar os filtros para encontrar os equipamentos
                  desejados
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-6 xl:gap-6">
              <AnimatePresence mode="wait">
                {currentEquipments.map((equipment, index) => (
                  <motion.div
                    key={`${equipment.id}-${pageKey}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.3,
                      ease: 'easeOut',
                    }}
                    className="group"
                    onClick={() => {
                      if (isMobile) {
                        setActiveCardId(
                          activeCardId === equipment.id ? null : equipment.id
                        )
                      }
                    }}
                  >
                    <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300 h-full hover:scale-[1.02]">
                      {/* Clean depth layers for equipment card */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

                      <CardHeader className="relative z-10 pb-3">
                        <div className="flex flex-col">
                          {/* Imagem do equipamento */}
                          <div className="w-full h-48 mb-6 md:mb-4 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                            {equipment.images &&
                            equipment.images.length > 0 &&
                            equipment.images[0] ? (
                              <Image
                                src={equipment.images[0]}
                                alt={equipment.name}
                                width={300}
                                height={200}
                                className="max-w-full max-h-full object-contain"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-16 h-16 text-gray-300" />
                              </div>
                            )}
                          </div>

                          <div className="text-left w-full">
                            <h3 className="font-semibold text-lg text-gray-900 truncate">
                              {equipment.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2 md:mt-1 line-clamp-2">
                              {equipment.description || 'Sem descrição'}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10 pt-0 flex-1 flex flex-col justify-between">
                        <div className="grid grid-cols-2 grid-rows-2 gap-y-4 md:gap-y-2 justify-between">
                          {/* Linha 1, Coluna 1 - Categoria */}
                          <div className="flex items-center justify-start">
                            {equipment.category ? (
                              <Badge
                                className="text-sm inline-flex items-center gap-1.5 font-medium px-2.5 py-0.5 rounded-full border-0 max-w-[150px] flex-shrink-0"
                                style={{
                                  backgroundColor:
                                    equipment.category.bgColor || '#e0e0e0',
                                  color:
                                    equipment.category.fontColor || '#000000',
                                }}
                              >
                                {equipment.category.icon &&
                                  renderIcon(
                                    equipment.category.icon,
                                    equipment.category.iconColor
                                  )}
                                <span className="truncate min-w-0">
                                  {equipment.category.name}
                                </span>
                              </Badge>
                            ) : (
                              <Badge className="text-sm inline-flex items-center gap-1.5 font-medium px-2.5 py-0.5 rounded-full border-0 bg-gray-200 text-gray-600 max-w-[150px] flex-shrink-0">
                                <span className="truncate min-w-0">
                                  Sem categoria
                                </span>
                              </Badge>
                            )}
                          </div>

                          {/* Linha 1, Coluna 2 - Preço */}
                          <div className="flex gap-2 text-sm items-center justify-center">
                            <DollarSign className="w-4 h-4 items-center justify-center text-green-500 flex-shrink-0" />
                            <span className="font-bold text-green-600">
                              {formatPrice(equipment.pricePerDay)}/dia
                            </span>
                          </div>

                          {/* Linha 2, Coluna 1 - Status */}
                          <div className="flex gap-2 text-sm items-center justify-start">
                            {equipment.isAvailable ? (
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                            )}
                            <span
                              className={`font-medium ${
                                equipment.isAvailable
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {equipment.isAvailable
                                ? 'Disponível'
                                : 'Indisponível'}
                            </span>
                          </div>

                          {/* Linha 2, Coluna 2 - Data de criação */}
                          <div className="flex gap-2 text-sm items-center justify-center pr-2.5">
                            <Calendar className="w-4 h-4 items-start justify-start text-gray-400 flex-shrink-0" />
                            <span className="text-gray-600">
                              {formatDate(equipment.createdAt)}
                            </span>
                          </div>
                        </div>

                        {/* Botões de ação */}
                        <div
                          className={`flex items-center justify-end gap-1 mt-6 md:mt-4 transition-all duration-300 ${
                            isMobile
                              ? activeCardId === equipment.id
                                ? 'opacity-100'
                                : 'opacity-0'
                              : 'opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedEquipment(equipment)
                            }}
                            className="admin-action-button view-button flex-shrink-0"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="admin-action-button edit-button flex-shrink-0"
                          >
                            <Link
                              href={`/admin/equipamentos/${equipment.id}/editar`}
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteEquipment(equipment.id)
                            }}
                            className="admin-action-button delete-button flex-shrink-0"
                            disabled={isDeleting}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Componente de Paginação - MOVIDO PARA BAIXO DOS EQUIPAMENTOS */}
        {!loading && filteredEquipments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8"
          >
            <SmartPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}

        {/* Overlay de Preview do Equipamento */}
        {selectedEquipment && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-2 py-6 sm:px-6"
            role="dialog"
            aria-modal="true"
            aria-label="Visualizar equipamento selecionado"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedEquipment(null)}
              aria-hidden="true"
            />
            <div className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
              <header className="flex items-center gap-3 border-b border-gray-100 bg-white px-6 py-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 text-white shadow-sm">
                  <Eye className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Visualizar Equipamento
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto rounded-full text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedEquipment(null)}
                  aria-label="Fechar visualização"
                >
                  <X className="h-5 w-5" />
                </Button>
              </header>

              <ScrollArea
                className="flex-1 min-h-0"
                style={{ maxHeight: 'calc(80vh - 120px)' }}
              >
                <div className="w-full max-w-full space-y-6 p-6 xs:space-y-4 xs:p-4">
                  {/* Preview do Equipamento com Carrossel */}
                  <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm relative w-full max-w-full xs:p-3 xs:rounded-md">
                    <div className="flex items-center justify-between mb-4 w-full">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-slate-700">
                          Preview do Equipamento
                        </h3>
                        <HybridTooltip
                          content={
                            <div className="max-w-xs leading-relaxed">
                              <span className="inline-flex items-start gap-1">
                                <span>💡</span>
                                <span>
                                  <strong className="font-semibold">
                                    Background Padrão:
                                  </strong>{' '}
                                  Quando nenhuma imagem estiver configurada, o
                                  fundo laranja atual será exibido
                                  automaticamente.
                                </span>
                              </span>
                            </div>
                          }
                        >
                          <Info
                            className="size-5 !text-gray-700 cursor-help transition-colors hover:!text-orange-600"
                            aria-hidden="true"
                          />
                        </HybridTooltip>
                      </div>
                      {selectedEquipment.images &&
                        selectedEquipment.images.length > 1 && (
                          <div className="text-xs text-slate-500 bg-white/70 px-2 py-1 rounded-full">
                            {currentImageIndex + 1} de{' '}
                            {selectedEquipment.images.length}
                          </div>
                        )}
                    </div>

                    {selectedEquipment.images &&
                    selectedEquipment.images.length > 0 ? (
                      <div className="relative group">
                        <div
                          className={`w-full h-64 mb-4 bg-gray-100 rounded-lg overflow-hidden relative cursor-pointer transition-all duration-300 ${
                            isImageZoomed ? 'transform scale-105' : ''
                          }`}
                          onClick={() => setIsImageZoomed(!isImageZoomed)}
                        >
                          <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="w-full h-full"
                          >
                            <Image
                              src={
                                selectedEquipment.images[currentImageIndex] ||
                                ''
                              }
                              alt={`${selectedEquipment.name} - Imagem ${currentImageIndex + 1}`}
                              width={500}
                              height={300}
                              className={`max-w-full max-h-full object-contain transition-all duration-500 ${
                                isImageZoomed
                                  ? 'object-contain bg-black/90'
                                  : ''
                              }`}
                            />
                          </motion.div>

                          {selectedEquipment.images.length > 1 && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  prevImage()
                                }}
                                aria-label="Imagem anterior"
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/85 hover:scale-110 backdrop-blur-sm rounded-full p-2.5 shadow-md opacity-0 group-hover:opacity-80 transition-all duration-300 flex items-center justify-center z-10"
                              >
                                <ChevronLeft className="w-5 h-5 text-gray-700" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  nextImage()
                                }}
                                aria-label="Próxima imagem"
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/85 hover:scale-110 backdrop-blur-sm rounded-full p-2.5 shadow-md opacity-0 group-hover:opacity-80 transition-all duration-300 flex items-center justify-center z-10"
                              >
                                <ChevronRight className="w-5 h-5 text-gray-700" />
                              </button>
                            </>
                          )}

                          {selectedEquipment.images.length > 1 && (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                              {selectedEquipment.images.map((_, index) => (
                                <motion.button
                                  key={index}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    goToImage(index)
                                  }}
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                  aria-label={`Ir para imagem ${index + 1}`}
                                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentImageIndex
                                      ? 'bg-white shadow-lg scale-125'
                                      : 'bg-white/60 hover:bg-white/80'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {selectedEquipment.images.length > 1 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
                          >
                            {selectedEquipment.images.map((image, index) => (
                              <motion.button
                                key={index}
                                onClick={() => goToImage(index)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={`Selecionar imagem ${index + 1}`}
                                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                  index === currentImageIndex
                                    ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <Image
                                  src={image}
                                  alt={`Thumbnail ${index + 1}`}
                                  width={64}
                                  height={48}
                                  className="max-w-full max-h-full object-contain"
                                />
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-64 mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Package className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">
                            Sem imagens disponíveis
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-slate-800 mb-2">
                        {selectedEquipment.name}
                      </h4>
                      <p className="text-xs text-slate-500 italic max-w-xs mx-auto leading-relaxed">
                        {selectedEquipment.description || 'Sem descrição'}
                      </p>
                    </div>
                  </div>

                  {/* Informações Detalhadas */}
                  <div className="space-y-4 w-full max-w-full">
                    <div
                      className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm relative"
                      style={{
                        borderLeft: `4px solid ${selectedEquipment.category?.bgColor || '#3b82f6'}`,
                      }}
                    >
                      <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Informações do Equipamento
                      </h3>
                      <div className="grid grid-cols-2 gap-4 max-w-full">
                        <div className="space-y-4 min-w-0 max-w-full">
                          <div className="flex items-start gap-3">
                            <Package className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                              <div className="text-xs text-gray-500">Nome</div>
                              <div className="font-medium text-sm">
                                {selectedEquipment.name}
                              </div>
                            </div>
                          </div>

                          {selectedEquipment.description && (
                            <div className="flex items-start gap-3">
                              <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0 max-w-full">
                                <div className="text-xs text-gray-500">
                                  Descrição
                                </div>
                                <div
                                  className="font-medium text-sm break-words hyphens-auto leading-relaxed"
                                  title={selectedEquipment.description}
                                  style={{
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                    hyphens: 'auto',
                                  }}
                                >
                                  {selectedEquipment.description}
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-start gap-3">
                            <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                              <div className="text-xs text-gray-500">
                                Criado em
                              </div>
                              <div className="font-medium text-sm">
                                {formatDate(selectedEquipment.createdAt)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 min-w-0 max-w-full">
                          {selectedEquipment.category && (
                            <div className="flex items-start gap-3">
                              <Tag className="w-4 h-4 text-gray-400 mt-0.5" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Categoria
                                </div>
                                <Badge
                                  style={{
                                    backgroundColor:
                                      selectedEquipment.category.bgColor ||
                                      '#f0f9ff',
                                    color:
                                      selectedEquipment.category.fontColor ||
                                      '#0c4a6e',
                                  }}
                                  className="text-xs inline-flex items-center gap-1 font-medium px-2.5 py-0.5 rounded-full border-0"
                                >
                                  {selectedEquipment.category.icon &&
                                    renderIcon(
                                      selectedEquipment.category.icon,
                                      selectedEquipment.category.iconColor
                                    )}
                                  {selectedEquipment.category.name}
                                </Badge>
                              </div>
                            </div>
                          )}

                          <div className="flex items-start gap-3">
                            <DollarSign className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                              <div className="text-xs text-gray-500">
                                Preço por dia
                              </div>
                              <div className="font-medium text-sm text-green-600">
                                {formatPrice(selectedEquipment.pricePerDay)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            {selectedEquipment.isAvailable ? (
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                            )}
                            <div>
                              <div className="text-xs text-gray-500">
                                Status
                              </div>
                              <div
                                className={`font-medium text-sm ${selectedEquipment.isAvailable ? 'text-green-600' : 'text-red-600'}`}
                              >
                                {selectedEquipment.isAvailable
                                  ? 'Disponível'
                                  : 'Indisponível'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <footer className="w-full max-w-full flex-shrink-0 border-t bg-gray-50 px-6 py-5 xs:px-4">
                <div className="flex w-full flex-wrap gap-4 xs:gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedEquipment(null)}
                    className="flex-1 h-10 rounded-lg border border-slate-200 bg-transparent shadow-md transition-all duration-300 hover:scale-105 hover:bg-slate-50 hover:shadow-lg"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Fechar
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => {
                      const equipmentId = selectedEquipment.id
                      setSelectedEquipment(null)
                      window.location.href = `/admin/equipamentos/${equipmentId}/editar`
                    }}
                    className="flex-1 shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    <Edit className="mr-2 h-4 w-4 transition-colors duration-200" />
                    Editar Equipamento
                  </Button>
                </div>
              </footer>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
