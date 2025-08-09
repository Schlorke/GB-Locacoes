'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
  // X, // Removido - não utilizado
  AlertTriangle,
  Archive,
  ArrowDown,
  ArrowUp,
  Bookmark,
  Box,
  Building,
  Calendar,
  Car,
  Check,
  Clock,
  Cloud,
  Copy,
  CreditCard,
  DollarSign,
  Download,
  Drill,
  Edit,
  Eye,
  Factory,
  File,
  Folder,
  Hammer,
  Heart,
  Home,
  Inbox,
  Key,
  Lock,
  Mail,
  Minus,
  Moon,
  Package,
  Palette,
  Pause,
  Phone,
  Play,
  Plus,
  Ruler,
  Save,
  SirenIcon as Saw,
  WrenchIcon as Screwdriver,
  Search,
  Send,
  Settings,
  Share,
  Shield,
  Star,
  CircleStopIcon as Stop,
  Store,
  Sun,
  Trash2,
  Truck,
  Upload,
  User,
  Users,
  Volume,
  Warehouse,
  Wifi,
  Wrench,
} from 'lucide-react'
import * as React from 'react'

// Lista direta de ícones importados
const ICONS = {
  Home,
  Settings,
  User,
  Users,
  Mail,
  Phone,
  Calendar,
  Clock,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  Download,
  Upload,
  Eye,
  Heart,
  Star,
  Bookmark,
  Share,
  Copy,
  Folder,
  File,
  Car,
  Truck,
  Building,
  Store,
  Factory,
  Warehouse,
  Hammer,
  Wrench,
  Screwdriver,
  Drill,
  Saw,
  Ruler,
  Package,
  Box,
  Archive,
  Inbox,
  Send,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  Stop,
  Volume,
  Wifi,
  Cloud,
  Sun,
  Moon,
  Shield,
  Lock,
  Key,
  CreditCard,
  DollarSign,
}

interface IconPickerProps {
  value?: string
  color?: string
  onSelect: (_iconName?: string, _iconColor?: string) => void
  onClose: () => void
  isOpen: boolean
}

export function IconPicker({
  value,
  color: initialColor,
  onSelect,
  isOpen,
  onClose,
}: IconPickerProps) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedIcon, setSelectedIcon] = React.useState<string | undefined>(
    value
  )
  const [iconColor, setIconColor] = React.useState<string>(
    initialColor || '#000000'
  )

  React.useEffect(() => {
    if (isOpen) {
      setSelectedIcon(value)
      setIconColor(initialColor || '#000000')
      setSearchTerm('')
    }
  }, [value, initialColor, isOpen])

  const iconNames = Object.keys(ICONS)
  const filteredIcons = iconNames.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectIcon = (iconName: string) => {
    setSelectedIcon(iconName)
  }

  const handleConfirm = () => {
    onSelect(selectedIcon, iconColor)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl w-[90vw] sm:w-full max-h-[90vh] overflow-y-hidden p-0 flex flex-col"
        aria-labelledby="icon-picker-title"
        aria-describedby="icon-picker-desc"
      >
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle id="icon-picker-title">Selecionar Ícone</DialogTitle>
          <DialogDescription id="icon-picker-desc">
            Escolha um ícone da biblioteca e personalize a cor.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:grid md:grid-cols-[280px_1fr] gap-0 flex-1 overflow-hidden">
          <div className="p-6 border-r flex flex-col gap-6 bg-muted/30">
            <div>
              <Label
                htmlFor="icon-color"
                className="mb-2 block font-medium text-sm"
              >
                Cor do Ícone
              </Label>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <Input
                  id="icon-color"
                  type="color"
                  value={iconColor}
                  onChange={(e) => setIconColor(e.target.value)}
                  className="w-10 h-10 p-1 rounded-md border cursor-pointer"
                />
                <Input
                  type="text"
                  value={iconColor}
                  onChange={(e) => setIconColor(e.target.value)}
                  placeholder="#000000"
                  className="flex-grow text-sm"
                />
              </div>
            </div>

            {selectedIcon && ICONS[selectedIcon as keyof typeof ICONS] && (
              <div className="flex flex-col items-center gap-2 py-2">
                <div className="p-2 border rounded-md bg-muted flex items-center justify-center w-20 h-20">
                  {React.createElement(
                    ICONS[selectedIcon as keyof typeof ICONS],
                    {
                      className: 'w-10 h-10',
                      color: iconColor,
                      strokeWidth: 1.5,
                    }
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {selectedIcon}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => setSelectedIcon(undefined)}
                >
                  Limpar Seleção
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-col max-h-[500px] overflow-hidden">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar ícones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full text-sm"
                />
              </div>
            </div>

            <ScrollArea className="flex-grow p-4 overflow-y-auto">
              {filteredIcons.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                  {filteredIcons.map((iconName) => {
                    const IconComponent = ICONS[iconName as keyof typeof ICONS]
                    return (
                      <Button
                        key={iconName}
                        variant="outline"
                        size="icon"
                        title={iconName}
                        className={cn(
                          'h-16 w-full flex items-center justify-center p-2 aspect-square',
                          selectedIcon === iconName &&
                            'border-primary bg-primary/10'
                        )}
                        onClick={() => handleSelectIcon(iconName)}
                      >
                        <IconComponent
                          size={24}
                          color={
                            selectedIcon === iconName
                              ? iconColor
                              : 'currentColor'
                          }
                          strokeWidth={1.5}
                        />
                      </Button>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertTriangle className="mx-auto h-10 w-10 mb-2 text-orange-400" />
                  <p className="font-medium">Nenhum ícone encontrado</p>
                  <p className="text-sm">
                    Tente buscar por &ldquo;Home&rdquo;, &ldquo;Settings&rdquo;,
                    etc.
                  </p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="p-6 pt-4 border-t">
          <Button
            variant="ghost"
            onClick={() => {
              onSelect(undefined, undefined)
              onClose()
            }}
            className="text-red-600"
          >
            Remover Ícone
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleConfirm}>
            <Check className="h-4 w-4 mr-2" />
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
