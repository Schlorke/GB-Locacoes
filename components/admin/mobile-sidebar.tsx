'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  FileText,
  LayoutDashboard,
  ListChecks,
  LogOut,
  PackageSearch,
  UserCircle,
  X,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/equipamentos', icon: PackageSearch, label: 'Equipamentos' },
  { href: '/admin/categorias', icon: ListChecks, label: 'Categorias' },
  { href: '/admin/orcamentos', icon: FileText, label: 'Orçamentos' },
];

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Bloquear scroll do body quando o sidebar estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/80 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-80 bg-background border-l shadow-lg transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/placeholder-logo.svg"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="shrink-0"
                />
                <div className="text-left">
                  <h2 className="text-lg font-bold">GB Locações</h2>
                  <p className="text-sm text-muted-foreground">Painel Administrativo</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 border border-slate-300 bg-slate-100 text-slate-900 shadow-lg hover:bg-slate-200 hover:text-orange-500 hover:shadow-xl transition-all duration-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navegação */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-sm font-medium border',
                      'hover:bg-slate-100 active:bg-slate-200',
                      isActive
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 border-primary/20'
                        : 'bg-slate-50/80 text-slate-700 border-slate-200/60 hover:border-slate-300/80',
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Seção do Usuário */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-4">
              <UserCircle className="h-10 w-10 ml-[0.2rem] text-slate-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 truncate">
                  {session?.user?.name || 'Administrador'}
                </p>
                <p className="text-sm text-slate-500 truncate">{session?.user?.role || 'ADMIN'}</p>
              </div>
            </div>

            <Separator className="mb-4" />

            <Button
              variant="ghost"
              onClick={() => {
                onClose();
                signOut({ callbackUrl: '/admin/login' });
              }}
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200/60 hover:border-red-300/80"
            >
              <LogOut className="h-5 w-5" />
              <span>Sair do Sistema</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
