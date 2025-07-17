'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CloseButton } from '@/components/ui/close-button';
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
import React, { useState } from 'react';

export interface CategoryData {
  id?: string;
  name: string;
  description: string;
  backgroundColor: string;
  fontColor: string;
  icon?: keyof typeof LucideIcons | null;
  iconColor: string;
}

interface ModernCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    _data: Omit<CategoryData, 'backgroundColor'> & {
      bgColor: string;
      icon: keyof typeof LucideIcons | null | undefined;
    },
  ) => Promise<void>;
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
}: ModernCategoryModalProps) {
  const [formData, setFormData] = useState<CategoryData>(
    initialData ?? {
      name: '',
      description: '',
      backgroundColor: '#3b82f6',
      fontColor: '#ffffff',
      icon: undefined,
      iconColor: '#ffffff',
    },
  );
  // Preenche o formulário ao abrir para edição
  React.useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
    } else if (isOpen && !initialData) {
      setFormData({
        name: '',
        description: '',
        backgroundColor: '#3b82f6',
        fontColor: '#ffffff',
        icon: undefined,
        iconColor: '#ffffff',
      });
    }
  }, [isOpen, initialData]);

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    submit?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDesignOpen, setIsDesignOpen] = useState(false);
  const [iconFilter, setIconFilter] = useState('');

  // Limpa erro de submit ao abrir modal ou ao mudar nome
  React.useEffect(() => {
    setErrors((prev) => ({ ...prev, submit: undefined }));
  }, [isOpen, formData.name, initialData]);

  async function handleSubmit() {
    setIsSubmitting(true);
    setErrors({});
    if (!formData.name.trim()) {
      setErrors({ name: 'O nome da categoria é obrigatório.' });
      setIsSubmitting(false);
      return;
    }
    try {
      // Corrige o nome do campo para o backend
      const { backgroundColor, icon, ...rest } = formData;
      const payload = {
        ...rest,
        bgColor: backgroundColor,
        icon: icon === undefined ? null : icon,
      };
      await onSave(payload);
      onClose();
    } catch (err: unknown) {
      let message = 'Erro ao salvar categoria.';
      if (
        err &&
        typeof err === 'object' &&
        'message' in err &&
        typeof (err as Record<string, unknown>).message === 'string'
      ) {
        message = String((err as Record<string, unknown>).message);
      }
      setErrors({ submit: message });
    }
    setIsSubmitting(false);
  }

  // Utilitário para renderizar ícones Lucide dinamicamente
  function renderIcon(icon: keyof typeof LucideIcons, size = 20, color?: string) {
    if (!icon) return null;
    const LucideIcon = LucideIcons[icon] as React.ElementType;
    return LucideIcon ? <LucideIcon size={size} color={color} /> : null;
  }
  return (
    <React.Fragment>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          closeButtonClassName="hover:bg-white"
          className="w-full max-w-lg h-[100svh] max-h-[100svh] p-0 gap-0 bg-white border-0 shadow-2xl rounded-lg overflow-visible data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed !left-[50%] !top-[50%] z-50 flex flex-col !translate-x-[-50%] !translate-y-[-50%] !m-0 xs:max-w-[98vw] xs:p-0"
          style={{
            paddingTop: 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
            height: 'calc(100svh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
            maxHeight: 'calc(100svh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
          }}
        >
          <DialogHeader className="p-6 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg flex-shrink-0">
            <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center text-white shadow-sm">
                <Tag className="w-4 h-4" />
              </div>
              {title}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 min-h-0 max-h-full w-full overflow-y-auto">
            <div className="p-6 space-y-6 xs:p-1 xs:space-y-3 w-full max-w-full">
              {/* Preview da Categoria */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-5 border border-slate-200 shadow-sm relative w-full max-w-full xs:p-2 xs:rounded-md">
                <div className="flex items-center justify-between mb-4 w-full">
                  <h3 className="text-sm font-semibold text-slate-700">Preview da Categoria</h3>
                  <Popover modal open={isDesignOpen} onOpenChange={setIsDesignOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs font-medium border-slate-300 hover:border-slate-400 hover:bg-white transition-all duration-200 rounded-lg shadow-sm bg-transparent"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent

                      className="popover-content fixed left-1/2 top-1/2 w-[380px] max-w-[calc(100vw-3rem)] p-0 shadow-2xl border rounded-lg bg-white z-[99999] max-h-[70vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2"

                      align="center"
                      side="bottom"
                      sideOffset={8}
                      avoidCollisions={false}
                      collisionPadding={0}
                      sticky="always"
                      onOpenAutoFocus={(e) => e.preventDefault()}
                      onCloseAutoFocus={(e) => e.preventDefault()}
                    >
                      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 modal-preview-scroll">
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
                                setFormData({ ...formData, icon: undefined });
                              }}
                              className="text-slate-400 hover:text-red-500 h-7 px-2 rounded-lg transition-colors text-xs"
                              title="Remover ícone"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              Remover
                            </Button>
                            <CloseButton
                              onClick={() => setIsDesignOpen(false)}
                              className="text-slate-400 hover:text-slate-600 h-7 w-7"
                              size="sm"
                              variant="ghost"
                            />
                          </div>
                        </div>
                        {/* Search Filter */}
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            placeholder="Buscar ícone..."
                            value={iconFilter}
                            onChange={(e) => setIconFilter(e.target.value)}
                            className="pl-10 border-gray-200 focus:border-blue-500 h-9 text-sm placeholder:text-slate-400 rounded-lg"
                          />
                        </div>
                        {/* Icons Grid */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="text-sm font-medium text-slate-700">Ícone</h5>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                            <div className="relative pb-0 category-icon-grid-container">
                              <div className="icon-grid-responsive icon-grid-scroll category-icon-grid">
                                {ICON_OPTIONS.filter((iconName) =>
                                  iconName.toLowerCase().includes(iconFilter.toLowerCase()),
                                )
                                  .slice(0, 48)
                                  .map((iconName) => {
                                    const isSelected = formData.icon === iconName;
                                    return (
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
                                          isSelected
                                            ? 'border-blue-400 shadow-md'
                                            : 'border-slate-200 hover:border-slate-300 hover:shadow-sm',
                                        )}
                                        title={iconName}
                                        data-bg={formData.backgroundColor}
                                        data-icon-color={formData.iconColor}
                                        style={{ backgroundColor: formData.backgroundColor }}
                                      >
                                        {renderIcon(
                                          iconName as keyof typeof LucideIcons,
                                          16,
                                          formData.iconColor,
                                        )}
                                      </button>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Color Sections */}
                        <div className="space-y-3">
                          <h5 className="text-sm font-medium text-slate-700">Cores</h5>
                          <div className="flex gap-4 justify-center">
                            {/* Icon Color */}
                            <div className="flex flex-col items-center gap-2">
                              <input
                                type="color"
                                value={formData.iconColor}
                                onChange={(e) =>
                                  setFormData({ ...formData, iconColor: e.target.value })
                                }
                                className="w-10 h-10 rounded-lg border-2 border-slate-300 cursor-pointer shadow-sm"
                                title="Selecionar cor do ícone"
                              />
                              <span className="font-medium text-slate-700 text-xs text-center">
                                Cor do Ícone
                              </span>
                            </div>
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
                          Salvar
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex justify-center mb-4 w-full">
                  <Badge
                    variant="outline"
                    className={cn(
                      'category-preview-badge text-xs inline-flex items-center gap-2 font-medium px-4 py-2 rounded-xl border-0 max-w-full transition-all duration-300',
                      'shadow-[4px_8px_18px_2px_rgba(0,0,0,0.18)] hover:shadow-[8px_12px_20px_2px_rgba(0,0,0,0.22)]',
                      'hover:scale-[1.07]',
                      'xs:text-[10px] xs:px-1 xs:py-1 xs:rounded-md',
                    )}
                    style={{
                      backgroundColor: formData.backgroundColor,
                      color: formData.fontColor,
                    }}
                  >
                    {formData.icon ? (
                      <span className="flex-shrink-0">
                        {renderIcon(formData.icon, 16, formData.iconColor)}
                      </span>
                    ) : null}
                    <span className="truncate font-semibold text-sm min-w-0">
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
              <div className="space-y-3 w-full max-w-full">
                <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                  Nome da Categoria *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Ferramentas de Construção"
                  className={cn(
                    'h-11 text-sm border-gray-200 focus:border-blue-500 rounded-lg xs:h-9 xs:text-xs w-full max-w-full',
                    errors.name && 'border-red-500 focus:border-red-500',
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
              <div className="space-y-3 w-full max-w-full">
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
                    'text-sm border-gray-200 focus:border-blue-500 resize-none rounded-lg xs:text-xs xs:h-16 w-full max-w-full',
                    errors.description && 'border-red-500 focus:border-red-500',
                  )}
                />
                {errors.description && (
                  <div className="flex items-center gap-2 text-red-600 text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.description}
                  </div>
                )}
                <p className="text-xs text-slate-500">
                  {formData.description.length}/200 caracteres
                </p>
              </div>
              {/* Erro de Envio */}
              <React.Fragment>
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
              </React.Fragment>
            </div>
          </ScrollArea>
          <DialogFooter className="p-6 border-t bg-gray-50 rounded-b-lg xs:p-1 xs:rounded-b-md w-full max-w-full flex-shrink-0">
            <div className="flex gap-4 w-full xs:gap-2 flex-wrap">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 h-11 rounded-lg border border-slate-200 hover:bg-slate-50 bg-transparent shadow-sm"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name.trim()}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 py-2 bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300 h-10 px-4 flex-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-plus w-4 h-4 mr-2"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                {initialData?.id ? 'Atualizar Categoria' : 'Nova Categoria'}
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
