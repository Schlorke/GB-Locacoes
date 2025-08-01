'use client';

import { Button } from '@/components/ui/button';
import { CloseButton } from '@/components/ui/close-button';
import { Menu, Phone, Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleInternalNavigation = () => {
    sessionStorage.setItem('internalNavigation', 'true');
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Equipamentos', href: '/equipamentos' },
    { name: 'Orçamento', href: '/orcamento' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
  ];

  // Função para verificar se é a página ativa
  const isActivePage = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 w-screen z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50">
      {/* Top Bar */}
      <div
        className="text-white py-2.5 w-full"
        style={{
          backgroundColor: '#334155', // azul igual ao theme-color
          backgroundImage: 'none',
          boxShadow: 'none',
          border: 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 font-medium">
                <Phone className="h-4 w-4 text-slate-200" />
                <span className="text-slate-100">(51) 2313-6262</span>
              </span>
              <span className="hidden md:inline text-slate-200 font-light">
                Atendimento especializado • Entrega em toda região de Porto Alegre
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-slate-200 hover:text-white transition-all duration-200 font-medium hover:scale-105"
                onClick={handleInternalNavigation}
              >
                Área do Cliente
              </Link>
              <Link
                href="/admin/login"
                className="text-slate-200 hover:text-white transition-all duration-200 font-medium hover:scale-105"
                onClick={handleInternalNavigation}
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
            onClick={handleInternalNavigation}
          >
            <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white p-2.5 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 group-hover:scale-105">
              GB
            </div>
            <div>
              <div className="font-bold text-lg text-slate-800 group-hover:text-slate-900 transition-colors duration-200">
                GB Locações
              </div>
              <div className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors duration-200">
                Equipamentos para Construção
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = isActivePage(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative font-medium transition-all duration-200 group py-2 ${
                    isActive ? 'text-orange-600' : 'text-slate-700 hover:text-orange-600'
                  }`}
                  onClick={handleInternalNavigation}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full transition-transform duration-300 origin-center ${
                      isActive
                        ? 'transform scale-x-100'
                        : 'transform scale-x-0 group-hover:scale-x-100'
                    }`}
                  ></span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 rounded-xl"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 rounded-xl"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Minha conta</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 rounded-xl"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrinho</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          {isMenuOpen ? (
            <CloseButton
              onClick={() => setIsMenuOpen(false)}
              variant="ghost"
              size="md"
              className="lg:hidden text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 rounded-xl"
              aria-label="Fechar menu"
            />
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 rounded-xl"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/50 py-4 bg-white/95 backdrop-blur-sm">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = isActivePage(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 mx-2 ${
                      isActive
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                    onClick={handleInternalNavigation}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-6 pt-4 border-t border-slate-200/50 px-2 space-y-2">
              <Button
                variant="outline"
                asChild
                className="w-full h-12 rounded-xl border-slate-200 hover:bg-orange-50 hover:border-orange-200 transition-all duration-200"
              >
                <Link href="/login" onClick={handleInternalNavigation}>
                  Área do Cliente
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
