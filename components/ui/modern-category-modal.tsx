'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { AlertTriangle, Edit, Palette, Save, Search, Tag, X } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

export interface CategoryData {
  id?: string;
  name: string;
  description: string;
  backgroundColor: string;
  fontColor: string;
  icon: keyof typeof LucideIcons;
  iconColor: string;
}

interface ModernCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (_data: CategoryData) => Promise<void>;
  initialData?: CategoryData;
  title?: string;
  saveButtonText?: string;
}

const ICON_OPTIONS: (keyof typeof LucideIcons)[] = [
  'Package',
  'Wrench',
  'Hammer',
  'Building',
  'Truck',
  'Settings',
  'Box',
  'Warehouse',
  'Cog',
  'Home',
  'Factory',
  'Car',
  'Users',
  'User',
  'Calendar',
  'Clock',
  'MapPin',
  'Phone',
  'Mail',
  'Globe',
  'Shield',
  'Star',
  'Heart',
  'ThumbsUp',
  'CheckCircle',
  'AlertCircle',
  'Info',
  'HelpCircle',
  'Search',
  'Filter',
  'Plus',
  'Minus',
  'X',
  'Check',
  'ChevronDown',
  'ChevronUp',
  'ChevronLeft',
  'ChevronRight',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Upload',
  'Download',
  'RefreshCw',
  'RotateCcw',
  'Copy',
  'Save',
  'FileText',
  'File',
  'Folder',
  'FolderOpen',
  'Image',
  'Camera',
  'Video',
  'Music',
  'Headphones',
  'Mic',
  'Speaker',
  'Volume1',
  'Volume2',
  'VolumeX',
  'Play',
  'Pause',
  'Square',
  'SkipBack',
  'SkipForward',
  'Repeat',
  'Shuffle',
  'Wifi',
  'WifiOff',
  'Bluetooth',
  'Battery',
  'BatteryLow',
  'Power',
  'PowerOff',
  'Zap',
  'Sun',
  'Moon',
  'Cloud',
  'CloudRain',
  'CloudSnow',
  'Umbrella',
  'Wind',
  'Eye',
  'EyeOff',
  'Lock',
  'Unlock',
  'Key',
  'CreditCard',
  'DollarSign',
  'PoundSterling',
  'Euro',
  'Bitcoin',
  'TrendingUp',
  'TrendingDown',
  'BarChart',
  'PieChart',
  'Activity',
  'Target',
  'Flag',
  'Award',
  'Gift',
  'ShoppingBag',
  'ShoppingCart',
  'Tag',
  'Bookmark',
  'Paperclip',
  'Link',
  'Unlink',
  'ExternalLink',
  'Share',
  'Share2',
  'MessageCircle',
  'MessageSquare',
  'Send',
  'Inbox',
  'Bell',
  'BellOff',
  'Smartphone',
  'Tablet',
  'Laptop',
  'Monitor',
  'Tv',
  'Watch',
  'Printer',
  'HardDrive',
  'Cpu',
  'Database',
  'Server',
  'Usb',
  'MousePointer',
  'Mouse',
  'Keyboard',
  'Gamepad',
  'Radio',
  'Film',
  'Disc',
  'Album',
  'FastForward',
  'Rewind',
  'MicOff',
  'PhoneCall',
  'PhoneOff',
  'PhoneIncoming',
  'PhoneOutgoing',
  'Voicemail',
  'Archive',
  'Trash',
  'Trash2',
  'Edit',
  'Edit2',
  'Edit3',
  'PenTool',
  'Type',
  'Bold',
  'Italic',
  'Underline',
  'Strikethrough',
  'AlignLeft',
  'AlignCenter',
  'AlignRight',
  'AlignJustify',
  'List',
  'Indent',
  'Outdent',
  'Quote',
  'Code',
  'Terminal',
  'FileCode',
  'Bug',
  'Hash',
  'AtSign',
  'Percent',
  'Slash',
  'Asterisk',
  'Equal',
  'Divide',
  'Calculator',
  'Sigma',
  'Pi',
  'Infinity',
  'BarChart2',
  'BarChart3',
  'LineChart',
  'Activity',
  'Thermometer',
  'Gauge',
  'Timer',
  'AlarmClock',
  'CalendarDays',
  'CalendarCheck',
  'CalendarX',
  'CalendarPlus',
  'CalendarMinus',
  'Sunrise',
  'Sunset',
  'Stars',
  'Sparkles',
  'Flame',
  'Snowflake',
  'Droplet',
  'CloudLightning',
  'Tornado',
  'Rainbow',
  'Map',
  'Navigation',
  'Compass',
  'Route',
  'Bus',
  'Bike',
  'Plane',
  'Ship',
  'Train',
  'Fuel',
  'ParkingCircle',
  'Building2',
  'Store',
  'Crosshair',
  'Focus',
  'SearchCheck',
  'SearchX',
  'ScanLine',
  'QrCode',
  'Glasses',
  'Telescope',
  'Microscope',
  'Binoculars',
  'Clapperboard',
  'Images',
  'FileImage',
  'Palette',
  'Brush',
  'Paintbrush',
  'Pen',
  'Pencil',
  'Eraser',
  'Ruler',
  'Triangle',
  'Circle',
  'Hexagon',
  'Pentagon',
  'Octagon',
  'Diamond',
  'Move',
  'Hand',
  'Grab',
  'Pointer',
  'Touchpad',
  'Fingerprint',
  'Scan',
  'ShieldCheck',
  'ShieldX',
  'ShieldAlert',
  'KeyRound',
  'UserCheck',
  'UserX',
  'UserPlus',
  'UserMinus',
  'UsersRound',
  'UserCog',
  'Contact',
  'IdCard',
  'Wallet',
  'Coins',
  'Banknote',
  'Receipt',
  'PiggyBank',
  'Shrink',
  'Expand',
  'Minimize',
  'Maximize',
  'ZoomIn',
  'ZoomOut',
  'Fullscreen',
  'Minimize2',
  'Maximize2',
  'MoreHorizontal',
  'MoreVertical',
  'Menu',
  'Grid',
  'Columns',
  'Rows',
  'Layout',
  'LayoutGrid',
  'LayoutList',
  'Sidebar',
  'PanelLeft',
  'PanelRight',
  'PanelTop',
  'PanelBottom',
  'Split',
  'Combine',
  'Merge',
  'GitBranch',
  'GitCommit',
  'GitMerge',
  'GitFork',
  'GitPullRequest',
  'TestTube',
  'FlaskConical',
  'Beaker',
  'Atom',
  'Dna',
  'Rocket',
  'Satellite',
  'Earth',
  'Orbit',
  'Hourglass',
  'BellRing',
  'BookmarkPlus',
  'BookmarkMinus',
  'BookmarkCheck',
  'BookmarkX',
  'Book',
  'BookOpen',
  'Library',
  'GraduationCap',
  'School',
  'University',
  'Award',
  'Trophy',
  'Medal',
  'Crown',
  'Cake',
  'Wine',
  'Coffee',
  'Beer',
  'Martini',
  'Pizza',
  'Apple',
  'Banana',
  'Cherry',
  'Grape',
  'Carrot',
  'Wheat',
  'Leaf',
  'TreePine',
  'Flower',
  'Sprout',
  'Clover',
  'Shell',
  'Fish',
  'Bird',
  'Cat',
  'Dog',
  'Rabbit',
  'Squirrel',
  'Turtle',
  'Snail',
  'Cat',
];

export function ModernCategoryModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  title = 'Nova Categoria',
  saveButtonText = 'Criar Categoria',
}: ModernCategoryModalProps) {
  const [formData, setFormData] = useState<CategoryData>({
    name: '',
    description: '',
    backgroundColor: '#3b82f6',
    fontColor: '#ffffff',
    icon: 'Package',
    iconColor: '#ffffff',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    submit?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDesignOpen, setIsDesignOpen] = useState(false);
  const [iconFilter, setIconFilter] = useState('');

  // Inicializar dados quando a modal abre
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          name: '',
          description: '',
          backgroundColor: '#3b82f6',
          fontColor: '#ffffff',
          icon: 'Package',
          iconColor: '#ffffff',
        });
      }
      setErrors({});
      setIsSubmitting(false);
      setIsDesignOpen(false);
      setIconFilter('');
    }
  }, [isOpen, initialData]);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome da categoria é obrigatório';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Nome deve ter no máximo 50 caracteres';
    }

    if (formData.description.length > 200) {
      newErrors.description = 'Descrição deve ter no máximo 200 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Erro ao salvar categoria',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderIcon = (iconName: keyof typeof LucideIcons, size = 20) => {
    const IconComponent = LucideIcons[iconName] as React.ComponentType<{ size: number }>;
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg max-h-[90vh] p-0 gap-0 bg-white border-0 shadow-2xl rounded-lg overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed !left-[50%] !top-[50%] z-50 grid !translate-x-[-50%] !translate-y-[-50%] !m-0">
        {/* Header */}
        <DialogHeader className="p-6 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg">
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Tag className="w-4 h-4" />
            </div>
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Conteúdo */}
        <ScrollArea className="flex-1 max-h-[calc(90vh-180px)]">
          <div className="p-6 space-y-6">
            {/* Preview da Categoria */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-5 border border-slate-200 shadow-sm relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-700">Preview da Categoria</h3>
                <Popover open={isDesignOpen} onOpenChange={setIsDesignOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-xs font-medium border-slate-300 hover:border-slate-400 hover:bg-white transition-all duration-200 rounded-lg shadow-sm bg-transparent"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1.5" />
                      Editar
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[380px] max-w-[calc(100vw-3rem)] p-0 shadow-2xl border rounded-lg bg-white z-[99999] design-popover-content"
                    align="center"
                    side="bottom"
                    sideOffset={8}
                    alignOffset={0}
                    avoidCollisions={false}
                    collisionPadding={0}
                    sticky="always"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onCloseAutoFocus={(e) => e.preventDefault()}
                  >
                    <div className="flex flex-col max-h-[70vh]">
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 modal-preview-scroll">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                              <Palette className="w-3.5 h-3.5 text-white" />
                            </div>
                            <h4 className="font-semibold text-base text-slate-800">
                              Personalizar Design
                            </h4>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setFormData({ ...formData, icon: '' as keyof typeof LucideIcons });
                              }}
                              className="text-slate-400 hover:text-red-500 h-7 px-2 rounded-lg transition-colors text-xs"
                              title="Remover ícone"
                            >
                              Remove
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setIsDesignOpen(false)}
                              className="text-slate-400 hover:text-slate-600 h-7 px-2 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Search Filter */}
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            placeholder="Buscar ícone..."
                            value={iconFilter}
                            onChange={(e) => setIconFilter(e.target.value)}
                            className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm placeholder:text-slate-400 rounded-lg focus:bg-white transition-colors"
                          />
                        </div>

                        {/* Icons Grid */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="text-sm font-medium text-slate-700">Ícone</h5>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                            <div className="icon-grid-responsive icon-grid-scroll">
                              {ICON_OPTIONS.filter((iconName) =>
                                iconName.toLowerCase().includes(iconFilter.toLowerCase()),
                              )
                                .slice(0, 48)
                                .map((iconName) => (
                                  <button
                                    key={iconName}
                                    type="button"
                                    onClick={() =>
                                      setFormData({
                                        ...formData,
                                        icon: iconName as keyof typeof LucideIcons,
                                      })
                                    }
                                    className={cn(
                                      'w-10 h-10 rounded-lg border transition-all duration-200 flex items-center justify-center group overflow-hidden',
                                      formData.icon === iconName
                                        ? 'border-blue-400 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-200'
                                        : 'border-slate-200 hover:border-slate-300 hover:bg-white bg-white text-slate-600 hover:shadow-sm',
                                    )}
                                    title={iconName}
                                  >
                                    {renderIcon(iconName as keyof typeof LucideIcons, 16)}
                                  </button>
                                ))}
                            </div>
                          </div>
                        </div>

                        {/* Color Sections */}
                        <div className="space-y-3">
                          <h5 className="text-sm font-medium text-slate-700">Cores</h5>
                          <div className="flex gap-4 justify-center">
                            {/* Background Color */}
                            <div className="flex flex-col items-center gap-2">
                              <input
                                type="color"
                                value={formData.backgroundColor}
                                onChange={(e) =>
                                  setFormData({ ...formData, backgroundColor: e.target.value })
                                }
                                className="w-10 h-10 rounded-lg border-2 border-slate-300 cursor-pointer shadow-sm"
                                title="Selecionar cor de fundo"
                              />
                              <span className="font-medium text-slate-700 text-xs text-center">
                                Cor de Fundo
                              </span>
                            </div>

                            {/* Font Color */}
                            <div className="flex flex-col items-center gap-2">
                              <input
                                type="color"
                                value={formData.fontColor}
                                onChange={(e) =>
                                  setFormData({ ...formData, fontColor: e.target.value })
                                }
                                className="w-10 h-10 rounded-lg border-2 border-slate-300 cursor-pointer shadow-sm"
                                title="Selecionar cor da fonte"
                              />
                              <span className="font-medium text-slate-700 text-xs text-center">
                                Cor da Fonte
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Save Button */}
                        <Button
                          onClick={() => setIsDesignOpen(false)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex justify-center mb-4">
                <Badge
                  variant="outline"
                  className="inline-flex items-center gap-3 font-semibold px-5 py-3 rounded-lg border-0 shadow-lg hover:shadow-xl transition-all duration-300 preview-badge"
                >
                  <span className="preview-icon">
                    <span className="preview-icon-color">{renderIcon(formData.icon, 20)}</span>
                  </span>
                  <span className="text-sm font-semibold">
                    {formData.name || 'Nome da Categoria'}
                  </span>
                </Badge>
              </div>

              {formData.description && (
                <div className="text-center">
                  <p className="text-xs text-slate-500 italic max-w-xs mx-auto leading-relaxed">
                    {formData.description}
                  </p>
                </div>
              )}
            </div>

            {/* Nome */}
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                Nome da Categoria *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Ferramentas de Construção"
                className={cn(
                  'h-11 text-sm bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-lg focus:ring-2 focus:ring-slate-500/20',
                  errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                )}
              />
              {errors.name && (
                <div className="flex items-center gap-2 text-red-600 text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.name}
                </div>
              )}
              <p className="text-xs text-slate-500">{formData.name.length}/50 caracteres</p>
            </div>

            {/* Descrição */}
            <div className="space-y-3">
              <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
                Descrição (Opcional)
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva brevemente esta categoria..."
                rows={3}
                className={cn(
                  'text-sm bg-slate-50 border-slate-200 focus:bg-white transition-colors resize-none rounded-lg focus:ring-2 focus:ring-slate-500/20',
                  errors.description && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                )}
              />
              {errors.description && (
                <div className="flex items-center gap-2 text-red-600 text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.description}
                </div>
              )}
              <p className="text-xs text-slate-500">{formData.description.length}/200 caracteres</p>
            </div>

            {/* Erro de Envio */}
            <AnimatePresence>
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-lg border border-red-200 bg-red-50"
                >
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">{errors.submit}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Footer */}
        <DialogFooter className="p-6 border-t bg-gray-50 rounded-b-lg">
          <div className="flex gap-4 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 h-11 rounded-lg border-slate-300 hover:bg-slate-50 bg-transparent"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.name.trim()}
              className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {saveButtonText}
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
        <style jsx>{`
          .design-popover-content {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 99999;
          }
          .preview-badge {
            background-color: ${formData.backgroundColor};
            color: ${formData.fontColor};
            box-shadow:
              0 4px 20px ${formData.fontColor}15,
              0 2px 10px ${formData.fontColor}10;
          }
          .preview-icon-color {
            color: ${formData.iconColor};
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
