'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ChevronsLeft,
  ChevronsRight,
  FileText,
  LayoutDashboard,
  ListChecks,
  LogOut,
  PackageSearch,
  UserCircle,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface AdminSidebarProps {
  onCollapseChange?: (_collapsed: boolean) => void;
}

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/equipamentos', icon: PackageSearch, label: 'Equipamentos' },
  { href: '/admin/categorias', icon: ListChecks, label: 'Categorias' },
  { href: '/admin/orcamentos', icon: FileText, label: 'Orçamentos' },
];

export default function AdminSidebar({ onCollapseChange }: AdminSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (onCollapseChange) onCollapseChange(isSidebarCollapsed);
  }, [isSidebarCollapsed, onCollapseChange]);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const SidebarContent = () => (
    <>
      <div
        className={cn(
          'p-3 sm:p-4 border-b border-slate-700 flex items-center',
          isSidebarCollapsed ? 'justify-center' : 'justify-between',
        )}
      >
        {!isSidebarCollapsed && (
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <Image
              src="/placeholder-logo.svg"
              alt="Logo"
              width={40}
              height={40}
              priority
              className="flex-shrink-0 w-auto h-auto"
            />
            <div className="flex flex-col min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-white truncate">GB Locações</h2>
              <p className="text-xs text-slate-400 truncate">Admin Panel</p>
            </div>
          </Link>
        )}
        {isSidebarCollapsed && (
          <Link href="/" className="flex items-center justify-center w-full py-2">
            <Image
              src="/placeholder-logo.svg"
              alt="Logo"
              width={40}
              height={40}
              priority
              className="w-auto h-auto"
            />
          </Link>
        )}
      </div>

      <nav className="flex-1 p-2 sm:p-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <li key={item.href} className="list-none">
                <Link
                  href={item.href}
                  title={item.label}
                  className={cn(
                    'flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-md transition-all duration-200 ease-in-out group text-sm sm:text-base',
                    'text-slate-300 hover:bg-slate-800 hover:text-white',
                    isActive && 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90',
                    isSidebarCollapsed && 'justify-center',
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0',
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-white',
                    )}
                  />
                  {!isSidebarCollapsed && (
                    <span className="font-medium truncate">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={cn(
          'border-t border-slate-700 mt-auto',
          isSidebarCollapsed ? 'px-3 py-3' : 'p-3 sm:p-4',
        )}
      >
        <div
          className={cn(
            'flex items-center gap-2 sm:gap-1.52 min-w-0 mb-3 w-full',
            isSidebarCollapsed ? 'justify-center' : 'justify-start',
          )}
        >
          <UserCircle
            className={cn(
              'h-10 w-10 text-slate-400 flex-shrink-0',
              isSidebarCollapsed && '-ml-[2px]',
            )}
          />
          {!isSidebarCollapsed && (
            <div className="flex flex-col min-w-0">
              <p className="text-sm sm:text-base font-medium text-slate-200 truncate">
                {session?.user?.name || 'Administrador'}
              </p>
              <p className="text-xs text-slate-400 truncate">{session?.user?.role || 'ADMIN'}</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className={cn(
            'flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-colors w-full group text-sm sm:text-base',
            isSidebarCollapsed ? 'justify-center px-2' : 'justify-start',
          )}
          title="Sair"
        >
          <LogOut className="h-5 w-5 sm:h-5 sm:w-5 text-slate-400 group-hover:text-red-400" />
          {!isSidebarCollapsed && <span className="font-medium">Sair</span>}
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden md:flex md:flex-col bg-slate-900 text-white transition-all duration-300 ease-in-out relative',
          isSidebarCollapsed ? 'w-16 lg:w-20' : 'w-56 lg:w-64',
        )}
      >
        <SidebarContent />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebarCollapse}
          className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 hover:from-slate-700 hover:via-slate-600 hover:to-slate-500 text-white rounded-full h-10 w-10 border-2 border-slate-500/30 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm hover:border-slate-400/50 z-[9999]"
          title={isSidebarCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
        >
          {isSidebarCollapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </Button>
      </aside>
    </>
  );
}
