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
import React, { useEffect, useState } from 'react';

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

// Ícones disponíveis organizados por categoria
const ICON_CATEGORIES = {
  Geral: [
    'Tag',
    'Package',
    'Box',
    'Archive',
    'Folder',
    'Star',
    'Heart',
    'Award',
    'Shield',
    'Crown',
  ],
  Ferramentas: [
    'Tool',
    'Wrench',
    'Hammer',
    'Screwdriver',
    'Drill',
    'Settings',
    'Cog',
    'Spanner',
    'Ruler',
    'Scissors',
  ],
  Veículos: [
    'Truck',
    'Car',
    'Plane',
    'Ship',
    'Train',
    'Bike',
    'Bus',
    'Ambulance',
    'Tractor',
    'Forklift',
  ],
  Tecnologia: [
    'Monitor',
    'Laptop',
    'Camera',
    'Headphones',
    'Printer',
    'Smartphone',
    'Tablet',
    'Cpu',
    'HardDrive',
    'Wifi',
  ],
  Construção: [
    'Building',
    'Home',
    'Warehouse',
    'Factory',
    'MapPin',
    'Mountain',
    'Trees',
    'Landmark',
    'Castle',
    'Church',
  ],
  Negócios: [
    'Briefcase',
    'Calculator',
    'Calendar',
    'Clock',
    'TrendingUp',
    'DollarSign',
    'CreditCard',
    'FileText',
    'PieChart',
    'BarChart',
  ],
  Símbolos: [
    'CheckCircle',
    'AlertTriangle',
    'Info',
    'XCircle',
    'Plus',
    'Minus',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
  ],
};

// Lista plana para compatibilidade
const ICON_OPTIONS = Object.values(ICON_CATEGORIES).flat();

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
    backgroundColor: '#e0f2fe',
    fontColor: '#0c4a6e',
    icon: 'Tag',
    iconColor: '#0ea5e9',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
          backgroundColor: '#e0f2fe',
          fontColor: '#0c4a6e',
          icon: 'Tag',
          iconColor: '#0ea5e9',
        });
      }
      setErrors({});
      setIsDesignOpen(false);
      setIconFilter('');
    }
  }, [isOpen, initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Nome deve ter no máximo 50 caracteres';
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = 'Descrição deve ter no máximo 200 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
      setErrors({
        submit: error instanceof Error ? error.message : 'Erro ao salvar categoria',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderIcon = (iconName: keyof typeof LucideIcons, size = 20) => {
    const IconComponent = LucideIcons[iconName] as React.ComponentType<any>;
    return IconComponent ? <IconComponent size={size} /> : <Tag size={size} />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg max-h-[90vh] p-0 gap-0 bg-white border-0 shadow-2xl rounded-lg fixed inset-0 m-auto h-fit overflow-hidden">
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
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-700">Preview da Categoria</h3>
                <Popover open={isDesignOpen} onOpenChange={setIsDesignOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-xs font-medium border-slate-300 hover:border-slate-400 hover:bg-white transition-all duration-200 rounded-lg shadow-sm"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1.5" />
                      Editar
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[calc(100vw-2rem)] max-w-md p-0 shadow-2xl border-0 rounded-lg bg-white z-50 max-h-[calc(100vh-8rem)] overflow-hidden"
                    align="center"
                    side="bottom"
                    sideOffset={8}
                    alignOffset={0}
                    avoidCollisions={true}
                    collisionPadding={16}
                    sticky="always"
                  >
                    <div className="max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                      <div className="p-4 space-y-4">
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
                            className="text-slate-400 hover:text-red-500 h-7 px-2 rounded-md transition-colors text-xs"
                            title="Remover ícone"
                          >
                            Remove
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsDesignOpen(false)}
                            className="text-slate-400 hover:text-slate-600 h-7 px-2 rounded-md"
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
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                          <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
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
                                    'p-3 rounded-lg border transition-all duration-200 hover:scale-105 flex items-center justify-center group',
                                    formData.icon === iconName
                                      ? 'border-blue-400 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-200'
                                      : 'border-slate-200 hover:border-slate-300 hover:bg-white bg-white text-slate-600 hover:shadow-sm',
                                  )}
                                  title={iconName}
                                >
                                  {renderIcon(iconName as keyof typeof LucideIcons, 20)}
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
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={formData.backgroundColor}
                              onChange={(e) =>
                                setFormData({ ...formData, backgroundColor: e.target.value })
                              }
                              className="w-8 h-8 rounded-lg border-2 border-slate-300 cursor-pointer shadow-sm"
                              title="Selecionar cor de fundo"
                            />
                            <span className="font-medium text-slate-700 text-sm">Cor de Fundo</span>
                          </div>

                          {/* Font Color */}
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={formData.fontColor}
                              onChange={(e) =>
                                setFormData({ ...formData, fontColor: e.target.value })
                              }
                              className="w-8 h-8 rounded-lg border-2 border-slate-300 cursor-pointer shadow-sm"
                              title="Selecionar cor da fonte"
                            />
                            <span className="font-medium text-slate-700 text-sm">Cor da Fonte</span>
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

              <div className="flex justify-center">
                <Badge
                  variant="outline"
                  className="inline-flex items-center gap-3 font-semibold px-5 py-3 rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: formData.backgroundColor,
                    color: formData.fontColor,
                    boxShadow: `0 4px 20px ${formData.fontColor}15, 0 2px 10px ${formData.fontColor}10`,
                  }}
                >
                  <span style={{ color: formData.iconColor }}>{renderIcon(formData.icon, 20)}</span>
                  <span className="text-sm font-semibold">
                    {formData.name || 'Nome da Categoria'}
                  </span>
                </Badge>
              </div>

              {formData.description && (
                <div className="text-center mt-4">
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
        <DialogFooter className="p-6 border-t bg-gray-50 rounded-b-xl">
          <div className="flex gap-4 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 h-11 rounded-xl border-slate-300 hover:bg-slate-50"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.name.trim()}
              className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
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
      </DialogContent>
    </Dialog>
  );
}
