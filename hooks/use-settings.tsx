'use client';

import { getSettings } from '@/app/api/admin/settings/actions';
import { createContext, useContext, useEffect, useState } from 'react';

interface SettingsContextType {
  settings: any;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const result = await getSettings();
      if (result.success) {
        setSettings(result.data);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const refresh = async () => {
    await loadSettings();
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, refresh }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings deve ser usado dentro de um SettingsProvider');
  }
  return context;
}

// Hook para configurações específicas
export function useCompanyInfo() {
  const { settings } = useSettings();

  return {
    companyPhone: settings?.companyPhone || '',
    companyAddress: settings?.companyAddress || '',
    contactEmail: settings?.contactEmail || '',
    whatsappNumber: settings?.whatsappNumber || '',
    aboutUsText: settings?.aboutUsText || '',
  };
}

export function useSocialLinks() {
  const { settings } = useSettings();

  return settings?.socialLinks || {};
}

export function useSEOSettings() {
  const { settings } = useSettings();

  return {
    seoTitle: settings?.seoTitle || 'GB Locações - Equipamentos para Construção',
    seoDescription: settings?.seoDescription || 'Locação de equipamentos para construção civil',
    favicon: settings?.favicon || '',
  };
}

export function useThemeSettings() {
  const { settings } = useSettings();

  return {
    themeColorPrimary: settings?.themeColorPrimary || '#ea580c',
    logoSecondary: settings?.logoSecondary || '',
  };
}

export function useMaintenanceMode() {
  const { settings } = useSettings();

  return {
    maintenanceMode: settings?.maintenanceMode || false,
    maintenanceMessage: settings?.maintenanceMessage || 'Site em manutenção. Voltamos em breve!',
  };
}
